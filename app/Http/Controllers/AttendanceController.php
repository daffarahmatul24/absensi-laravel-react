<?php
namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;

class AttendanceController extends Controller
{

    public static function isTodayAttendedSubmitted(): bool
    {
        return Attendance::where('user_id', Auth::id())
            ->whereDate('created_at', now()->toDateString())
            ->exists();
    }

    public function index(): Response
    {
        $attendances = Attendance::with('user')->paginate(10);

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances,
        ]);
    }

    // =============================
    // FUNCTION SIMPAN ABSENSI (SATU PINTU)
    // =============================
    private function storeAttendance($status, $description, $latitude, $longitude, $address)
    {
        return Attendance::create([
            'user_id'     => Auth::id(),
            'status'      => $status,
            'description' => $description,
            'latitude'    => $latitude,
            'longitude'   => $longitude,
            'address'     => $address,
        ]);
    }

    // =============================
    // ABSENSI MANUAL
    // =============================
    public function submit(Request $request)
    {
        $request->validate([
            'status'      => 'required',
            'description' => 'required_if:status,sick,leave,permit,business_trip,remote|max:500|nullable',
            'latitude'    => 'required',
            'longitude'   => 'required',
            'address'     => 'required',
        ]);

        if (self::isTodayAttendedSubmitted()) {
            return back()->withErrors(['message' => 'Anda sudah absen hari ini']);
        }

        $this->storeAttendance(
            $request->status,
            $request->description,
            $request->latitude,
            $request->longitude,
            $request->address
        );

        return back()->with('manual_success', 'Absensi berhasil');
    }

    // =============================
    // ABSENSI FACE
    // =============================

    public function testFacialRecognition(Request $request)
    {

        if (self::isTodayAttendedSubmitted()) {
            return back()->withErrors(['message' => 'Anda sudah absen hari ini']);
        }

        $process = new Process([
            'C:\Users\daffa\AppData\Local\Python\bin\python.exe',
            'facialRecognition.py',
        ], env: ['SYSTEMROOT' => getenv('SYSTEMROOT')]);

        $process->setWorkingDirectory('D:/laragon/www/absensi/face-recognition-python');
        $process->run();

        if (! $process->isSuccessful()) {
            return back()->withErrors(['message' => $process->getErrorOutput()]);
        }

        // Ambil output Python
        $output = trim($process->getOutput());
        preg_match('/MATCH:(\d+)/', $output, $matches);
        $userId = $matches[1] ?? null;

        if (! $userId) {
            return back()->with('face_failed', 'Wajah tidak dikenali');
        }

        if ((int) $userId !== Auth::id()) {
            return back()->withErrors([
                'message' => 'Wajah tidak sesuai dengan akun login',
            ]);
        }

        $this->storeAttendance(
            'attend',
            'face recognition',
            $request->latitude,
            $request->longitude,
            $request->address
        );

        return back()->with('face_success', 'Wajah dikenali, absensi berhasil');

    }
}

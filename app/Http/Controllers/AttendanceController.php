<?php
namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    static function isTodayAttendedSubmitted(): bool
    {
        return Attendance::where('user_id', Auth::user()->id)
            ->whereDate('created_at', now()->toDateString())
            ->exists();
    }

    public function index(): Response
    {
        $attendances = Attendance::with('user')->paginate(10);
        
        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances
        ]);
    }

    public function submit(Request $request)
    {
        $request->validate([
            'status'      => 'required',
            'description' => 'required_if:status,sick,leave,permit,business_trip,remote|max:500|nullable',
            'latitude'    => 'required',
            'longitude'   => 'required',
            'address'     => 'required',
        ]);

        Attendance::create([
            'user_id'     => auth()->id(),
            'status'      => $request->status,
            'description' => $request->description,
            'latitude'    => $request->latitude,
            'longitude'   => $request->longitude,
            'address'     => $request->address,
        ]);

        // return response()->json($attendance, 201);
    }
}

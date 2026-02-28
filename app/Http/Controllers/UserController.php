<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Process\Process;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);

        return Inertia::render('User/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'                  => 'required',
            'email'                 => 'required|email|unique:users,email',
            'password'              => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ]);

        User::create($request->all());

        return redirect()->route('users');
    }

    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'                  => 'required',
            'email'                 => 'required|email|unique:users,email,' . $user->id,
            'password'              => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password',
        ]);

        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'role'     => $request->role,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        return redirect()->route('users');
    }

    public function takePhoto(Request $request, $userId)
    {
        $process = new Process(['C:\Users\daffa\AppData\Local\Python\bin\python.exe',
            'saveDataset.py',
            $userId],
            env: [
                'SYSTEMROOT' => getenv('SYSTEMROOT'),
            ]);
        $process->setWorkingDirectory('D:/laragon/www/absensi/face-recognition-python');
        $process->run();

        if (! $process->isSuccessful()) {
            return $process;
        }
    }

    public function testFacialRecognition(Request $request)
    {
        $process = new Process(['C:\Users\daffa\AppData\Local\Python\bin\python.exe',
            'facialRecognition.py'],
            env: [
                'SYSTEMROOT' => getenv('SYSTEMROOT'),
            ]);
        $process->setWorkingDirectory('D:/laragon/www/absensi/face-recognition-python');
        popen("start cmd /k ...", "r");


        if (! $process->isSuccessful()) {
            return $process;
        }
    }

}

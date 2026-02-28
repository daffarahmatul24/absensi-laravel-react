<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/edit/{user}', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/update/{user}', [UserController::class, 'update'])->name('users.update');
    Route::post('/users/take-photo/{userId}', [UserController::class, 'takePhoto'])->name('users.takePhoto');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/attendances', [\App\Http\Controllers\AttendanceController::class, 'index'])->name('attendances.index');
    Route::post('/attendances/submit', [\App\Http\Controllers\AttendanceController::class, 'submit'])->name('attendances.submit');
    Route::post('/attendances/test-facial-recognition', [AttendanceController::class, 'testFacialRecognition'])->name('attendances.testFacialRecognition');

});

require __DIR__ . '/auth.php';

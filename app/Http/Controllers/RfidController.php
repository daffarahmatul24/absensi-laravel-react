<?php
namespace App\Http\Controllers;

use App\Events\ReadRfidEvent;
use App\Models\User;
use Illuminate\Http\Request;

class RfidController extends Controller
{
    public function read(Request $request)
    {
        if (User::where('uid', $request->uid)->exists()) {
            event(new ReadRfidEvent
                ($request->uid, 'EXISTS', 'RFID already exists'));

            return response()->json([
                'message' => 'RFID already exists',
                'code'    => 'EXISTS',
                'UID'     => $request->uid,
            ]);
        } else {
            event(new ReadRfidEvent
                ($request->uid, 'SUCCESS', 'RFID read successfully'));

            return response()->json([
                'message' => 'RFID read successfully',
                'code'    => 'SUCCESS',
                'uid'     => $request->uid,
            ]);
        }
    }
}

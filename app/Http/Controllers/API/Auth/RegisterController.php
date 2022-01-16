<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {

        $validated = $request->validate([
            'login' => 'required|unique:users',
            'email' => 'required|unique:users',
            'phone' => 'required|numeric|unique:users',
            'password' => 'required'
        ]);
        
        if ($request->userpic && Storage::exists('public/tmp/'.$request->userpic))
        {
            Storage::move('public/tmp/'.$request->userpic, 'public/userpic/'.$request->userpic);
        }

        $user = User::create(array_merge(
            $request->only('login', 'email', 'phone', 'first_name', 'last_name', 'userpic'),
            [
                'password' => bcrypt($request->password),
                'role_id' => 3
            ],
        ));

        return response()->json([
            'message' => 'You were successfully registered. Use your email and password to sign in.'
        ], 200);
    }
}
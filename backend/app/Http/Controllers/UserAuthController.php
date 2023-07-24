<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class UserAuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'fail',
                'errors' => [
                    'message' => 'Email or password is incorrect'
                ]
            ], 400);
        }     
        $token = $this->generateToken();
        return response()->json([
            'message' => 'success',
            'data' => [
                'token' => $token,
                'user' => auth()->user(),
            ]
        ]);
    }

    protected function generateToken()
    {
        return auth()->user()->createToken(env('TOKEN'))->plainTextToken;
    }
}

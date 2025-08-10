<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request) {
        //  // Step 1: Validation

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

         // Step 2: Handle Validation Failure
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' =>  $validator->errors()->all()
            ]);
        } else {
            // Step 3: Extract Credentials
            $credentials = [
                'email' => $request->email,
                'password' => $request->password,
            ];

            // Step 4: Attempt Login
            if (Auth::attempt($credentials)){

                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;

               return response()->json([
                'status' => true,
                'token' =>  $token,
                'id' => Auth::user()->id,
                'message' => 'Login Successfully'
            ]);
         } else {
                return response()->json([
                'status' => false,
                'message' =>  'Either email or password is incorrect.'
            ]);
            }
        }
    }

    public function logout(){
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json([
                'status' => true,
                'message' =>  'You logout successfully'
            ]);
    }
}

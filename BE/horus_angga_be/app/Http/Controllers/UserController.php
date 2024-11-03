<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index() {
        return User::all();
    }

    public function store(Request $request) {
        $request->validate([
            'username'=>'required|unique:users',
            'password'=>'required',
            'email'=>'required|email|unique:users',
            'name'=>'required'
        ]);

        $user = new user();
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();

        return response()->json(['message'=>'user created'], 201);
    }


     public function show($id){
        return user::findOrFail($id);
    }

    public function update(Request $request, $id){
        $user = User::findOrFail($id);
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();

        return response()->json(['message'=> 'user updated']);
    }

    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message'=> 'user deleted']);
    }

    public function login(Request $request){
        $request->validate([
            'username'=> 'required',
            'password' => 'required'
        ]);

        $user = User::where('username', $request->username)->first();

    // Cek apakah user ada dan password cocok
    if ($user && Hash::check($request->password, $user->password)) {
        // Buat token sederhana untuk sesi ini (misalnya menggunakan JWT atau string acak)
        $token = Str::random(60);
        $user->api_token = $token; // simpan token di database
        $user->save();

        // Kirim respons sukses dengan token
        return response()->json(['token' => $token, 'message' => 'Login berhasil'], 200);
    }

    // Jika login gagal
    return response()->json(['message' => 'Username atau password salah'], 401);
}

}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User; // Pastikan Anda menggunakan model yang tepat
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Ambil parameter untuk sorting
        $sortField = $request->query('sort_field', 'id'); // Default sort by 'id'
        $sortDirection = $request->query('sort_direction', 'asc'); // Default sort direction 'asc'

        // Validasi parameter sorting
        if (!in_array($sortField, ['id', 'username', 'email', 'name'])) {
            $sortField = 'id'; // Fallback to 'id' if invalid
        }

        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'asc'; // Fallback to 'asc' if invalid
        }

        // Fetch users with sorting
        $users = User::orderBy($sortField, $sortDirection)->get();

        return response()->json($users)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users',
            'password' => 'required',
            'email' => 'required|email|unique:users',
            'name' => 'required'
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();

        return response()->json(['message' => 'user created'], 201)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function show($id)
    {
        return response()->json(User::findOrFail($id))
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required|email',
            'name' => 'required',
            'password' => 'nullable' // Allow password to be optional on update
        ]);

        $user = User::findOrFail($id);
        $user->username = $request->username;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();

        return response()->json(['message' => 'user updated'])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'user deleted'])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
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
            return response()->json(['token' => $token, 'message' => 'Login berhasil'], 200)
                ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        }

        // Jika login gagal
        return response()->json(['message' => 'Username atau password salah'], 401)
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
}

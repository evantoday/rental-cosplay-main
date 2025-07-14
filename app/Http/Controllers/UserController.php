<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Cosrent;
use App\Enums\UserStatus;
use Illuminate\Http\Request;
use App\Models\RequestCosrent;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function admincheck()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }
    }

    public function search(Request $request)
    {
        $users = User::where('role_id', '!=', Role::where('name', 'admin')->first()->id)
            ->where('status', UserStatus::Active->value)
            ->search(
                keyword: $request->search,
                columns: ['name', 'email'],
            )->get();

        return response()->json($users, 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->admincheck();

        $users = User::where('role_id', '!=', Role::where('name', 'admin')->first()->id)
            ->where('status', UserStatus::Active->value)
            ->get();

        return Inertia::render("Admin/User/App", [
            "datas" => $users
        ]);
    }

    public function bannedlist()
    {
        $this->admincheck();

        $users = User::where('role_id', '!=', Role::where('name', 'admin')->first()->id)
            ->where('status', UserStatus::Banned->value)
            ->get();

        return Inertia::render("Admin/User/BannedList", [
            "datas" => $users
        ]);
    }

    public function searchbanned(Request $request)
    {
        $users = User::where('role_id', '!=', Role::where('name', 'admin')->first()->id)
            ->where('status', UserStatus::Banned->value)
            ->search(
                keyword: $request->search,
                columns: ['name', 'email'],
            )->get();

        return response()->json($users, 200);
    }

    public function detail(string $id)
    {
        $this->admincheck();
        $user = User::find($id);
        if ($user === null) {
            abort(404, 'User not found');
        }

        return Inertia::render("Admin/User/Detail", [
            "datas" => $user
        ]);
    }

    public function ban(string $id)
    {
        $this->admincheck();
        $user = User::find($id);
        if ($user === null) {
            abort(404, 'User not found');
        }

        $user->status = UserStatus::Banned->value;
        $user->save();
        return redirect()->route('admin.user.bannedlist')->with('success', 'User berhasil dibanned!');
    }

    public function unban(string $id)
    {
        $this->admincheck();
        $user = User::find($id);
        if ($user === null) {
            abort(404, 'User not found');
        }
        $user->status = UserStatus::Active->value;
        $user->save();
        return redirect()->route('admin.user.bannedlist')->with('success', 'User berhasil dipulihkan!');
    }


    //tambahan untuk request menjadi cosrent
    public function getrequest()
    {
        $this->admincheck();
        $user_request_cosrent = DB::table("request")
            ->select('request.*', 'users.name', 'users.email', 'users.id as user_id')
            ->join('users', 'request.user_id', '=', 'users.id')
            ->get();
        // $user_request_cosrent = RequestCosrent::with('user:id,name,email')->get();
        $auth = auth()->user();
        return Inertia::render("Admin/Cosrent/Request", [
            "datas" => $user_request_cosrent,
            "auth" => $auth
        ]);
    }

    public function approve(Request $request, string $id)
    {
        $this->admincheck();
        $request->validate([
            "user_id" => "required",
            "status" => "required",
        ], [
            "user_id.required" => "User ID harus dikirim dengan benar!",
            "status.required" => "Status harus dikirim dengan benar!",
        ]);

        $user = User::find($request->user_id);
        $request_cosrent = RequestCosrent::find($id);
        $role_id = Role::where("name", "cosrent")->first()->id;

        if (!$user || !$request_cosrent) {
            return redirect()->back()->with('error', 'Data tidak ditemukan!');
        }

        try {
            DB::beginTransaction();

            if ($user->role->name === 'user') {
                $request_cosrent->update([
                    "status" => $request->status
                ]);

                if ($request->status === "approved") {
                    $update_role = $user->update([
                        "role_id" => $role_id
                    ]);

                    if ($update_role) {
                        Cosrent::create([
                            "user_id" => $user->id,
                            "cosrent_name" => $user->name,
                        ]);
                    }
                }

                DB::commit();

                return redirect()->route('admin.cosrent.getrequest')->with('success', 'Request berhasil diproses!');
            }

            DB::rollBack();
            return redirect()->route('admin.cosrent.getrequest')->with('error', 'User role tidak valid untuk permintaan ini.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.cosrent.getrequest')->with('error', 'Terjadi kesalahan Server.');
        }
    }

    public function reject(Request $request, string $id)
    {
        $this->admincheck();
        $request->validate([
            "status" => "required",
        ], [
            "status.required" => "Status harus dikirim dengan benar!",
        ]);

        $request_cosrent = RequestCosrent::find($id);

        if (!$request_cosrent) {
            return redirect()->back()->with('error', 'Data tidak ditemukan!');
        }

        try {
            $request_cosrent->update([
                "status" => $request->status
            ]);

            return redirect()->route('admin.cosrent.getrequest')->with('success', 'Request berhasil diproses!');
        } catch (\Exception $e) {
            return redirect()->route('admin.cosrent.getrequest')->with('error', 'Terjadi kesalahan Server.');
        }
    }

    public function request(Request $request)
    {
        $request->validate([
            "reason_to_be_cosrent" => "required",
        ], [
            "reason_to_be_cosrent.required" => "Mohon isi alasan",
        ]);

        $userId = auth()->user()->id;
        $user = User::find($userId);
        if ($user->role->name === 'user') {
            RequestCosrent::create([
                'user_id' => $userId,
                "reason_to_be_cosrent" => $request->reason_to_be_cosrent,
            ]);

            return redirect()->route('user.dashboard')->with('success', 'Request berhasil dikirim, mohon tunggu konfirmasi dari admin!');
        }
    }
}

<?php

use Inertia\Inertia;
use App\Models\Costum;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\RentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CostumController;
use App\Http\Controllers\BiodataController;
use App\Http\Controllers\CosrentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderListController;
use App\Http\Controllers\LandingPageController;

// ✅ Hanya 1 route '/' yang aktif dan benar
Route::get('/', function () {
    $costume = Costum::with(['category', 'images_of_costum' => function ($query) {
        $query->select('id', 'costum_id', 'images_link')->orderBy('id', 'asc');
    }])->with('cosrent')->get()->map(function ($image) {
        $image->images_of_costum->map(function ($item) {
            $item->images_link = Storage::url('public/' . $item->images_link);
            return $item;
        });
        return $image;
    });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'datas' => $costume,
    ]);
})->name('welcome');

Route::get('/search', [LandingPageController::class, 'search'])->name('search');

// ==============================
// AUTHENTICATED ROUTES
// ==============================
Route::middleware('auth')->group(function () {

    // Redirect dashboard sesuai role
    Route::get('/dashboard', function () {
        $userRole = auth()->user()->role->name;

        return match ($userRole) {
            'admin' => redirect()->route('admin.dashboard'),
            'cosrent' => redirect()->route('cosrent.dashboard'),
            'user' => redirect()->route('user.dashboard'),
            default => abort(403),
        };
    })->name('dashboard');

    // ADMIN Routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'indexAdmin'])->name('admin.dashboard');

        Route::resource('category', CategoryController::class)->names([
            'index' => 'admin.category',
            'create' => 'admin.category.create',
            'store' => 'admin.category.store',
            'edit' => 'admin.category.edit',
            'update' => 'admin.category.update',
            'destroy' => 'admin.category.destroy',
        ]);

        Route::resource('cosrent', CosrentController::class)->except(['show'])->names([
            'index' => 'admin.cosrent',
            'create' => 'admin.cosrent.create',
            'store' => 'admin.cosrent.store',
            'edit' => 'admin.cosrent.edit',
            'update' => 'admin.cosrent.update',
            'destroy' => 'admin.cosrent.destroy',
        ]);

        Route::get('/admin/cosrent/search', [CosrentController::class, 'search'])->name('admin.cosrent.search');

        Route::get('/user', [UserController::class, 'index'])->name('admin.user');
        Route::get('/user/banned', [UserController::class, "bannedlist"])->name('admin.user.bannedlist');
        Route::get('/user/{id}/detail', [UserController::class, 'detail'])->name('admin.user.detail');
        Route::put('/user/{id}/ban', [UserController::class, 'ban'])->name('admin.user.banned');
        Route::put('/user/{id}/unban', [UserController::class, 'unban'])->name('admin.user.unban');
        Route::get('/user/getrequest', [UserController::class, 'getrequest'])->name('admin.cosrent.getrequest');
        Route::post('/user/{id}/approve', [UserController::class, 'approve'])->name('admin.user.approve');
        Route::post('/user/{id}/reject', [UserController::class, 'reject'])->name('admin.user.reject');
        Route::get('/users/search', [UserController::class, 'search'])->name('admin.users.search');
        Route::get('/users/banned/search', [UserController::class, 'searchbanned'])->name('admin.users.search.banned');
    });

    // COSRENT Routes
    Route::prefix('cosrent')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'indexCosrent'])->name('cosrent.dashboard');

        Route::resource('costum', CostumController::class)->names([
            'index' => 'cosrent.costum',
            'create' => 'cosrent.costum.create',
            'store' => 'cosrent.costum.store',
            'show' => 'cosrent.costum.show',
            'edit' => 'cosrent.costum.edit',
            'update' => 'cosrent.costum.update',
            'destroy' => 'cosrent.costum.destroy',
        ]);

        Route::get('/costum/search', [CostumController::class, 'search'])->name('cosrent.costum.search');
        Route::delete('/costum/delete-image/{id}', [CostumController::class, 'deleteImage'])->name('cosrent.costum.delete-image');

        Route::get('/order', [OrderListController::class, 'index'])->name('cosrent.order');
        Route::get('/order/{id}', [OrderListController::class, 'show'])->name('cosrent.order.show');

        Route::get('/biodata', [BiodataController::class, 'indexCosrent'])->name('cosrent.biodata');
        Route::get('/{cosrent_id}/export-pdf', [DashboardController::class, 'exportCosrentReport'])->name('cosrent.export-pdf');
    });

    // USER Routes
    Route::prefix('user')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'indexUser'])->name('user.dashboard');
        Route::get('/detail-costume/{id}', [LandingPageController::class, 'detailCostumeUser'])->name('user.detailCostume');
        Route::get('/history', [HistoryController::class, 'index'])->name('user.history');
        Route::get('/history/{id}', [HistoryController::class, 'show'])->name('user.history.detail');
        Route::get('/biodata', [BiodataController::class, 'index'])->name('user.biodata');
    });

    // Rental & Payment
    Route::get('/rental/{id}', [RentController::class, 'formRent'])->name('rental.form');
    Route::post('/rent/{id}', [RentController::class, 'submitRent'])->name('rent.submit');
    Route::get('/payment/{id}', [RentController::class, 'paymentForm'])->name('rent.payment');
    Route::post('/payment/{id}', [RentController::class, 'submitPayment'])->name('rent.payment.submit');
    Route::post('/order/{id}/confirm', [RentController::class, 'confirmOrder'])->name('order.confirm');
    Route::post('/order/{id}/reject', [RentController::class, 'rejectOrder'])->name('order.reject');
    Route::get('/order/{id}/export-pdf', [OrderController::class, 'exportPdf'])->name('order.export.pdf');

    // Biodata & Profile
    Route::post('/biodata', [BiodataController::class, 'store'])->name('biodata.store');
    Route::put('/biodata/{id}', [BiodataController::class, 'update'])->name('biodata.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/cosrent', [ProfileController::class, 'cosrent'])->name('profile.cosrent.update');

    // User Request menjadi Cosrent
    Route::post('/user/request', [UserController::class, 'request'])->name('user.request');
});

require __DIR__.'/auth.php';

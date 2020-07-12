<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/usuario/login', 'Auth\LoginController@loginComSenha');
Route::post('/usuario/registrar', 'Auth\RegisterController@registrarUsuario');


Route::get('/marcas/listar', 'MarcasController@index');
Route::post('/marcas/salvar', 'MarcasController@store');
Route::post('/marcas/editar', 'MarcasController@update');
Route::delete('/marcas/deletar/{id}', 'MarcasController@delete');

Route::get('/carros/listar', 'CarrosController@index');
Route::post('/carros/salvar', 'CarrosController@save');
Route::delete('/carros/deletar/{id}', 'CarrosController@delete');
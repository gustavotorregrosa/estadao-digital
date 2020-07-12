<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function loginComSenha(Request $request){
        $credentials = $request->only('email', 'password');
        if(\Auth::attempt($credentials)){
            $usuario = \App\Models\User::where('email', $credentials['email'])->first();
            $conteudo = \App\Models\JWTValidator::dadosUsuario($usuario);
            return respostaCors($conteudo, 200, "Usuario se logou com sucesso");
        }
        return respostaCors([], 401, "Usuario/senha inválidos");
    }

}

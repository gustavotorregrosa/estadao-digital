<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\JWTValidator;

class CheckJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $jwtValidator = new JWTValidator($request);
        if ($jwtValidator->isJwtValido()) {
            \Auth::login($jwtValidator->objUsuario());
            
            return $next($request);
        }
   
        if ($conteudoRefresh = $jwtValidator->refreshToken()) {
            return respostaCors($conteudoRefresh, 203);
        }
        return respostaCors([], 301, "Login com senha");
    }


    public function terminate($request, $response)
    {
        if (\Auth::check()) {
            \Auth::logout();
        }   
    }
}

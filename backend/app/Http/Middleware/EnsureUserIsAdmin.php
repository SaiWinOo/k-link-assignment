<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->user() && auth()->user()->role->name !== 'admin'){
            return \response()->json([
               'message' => 'fail',
                'data' => [
                    'message' => 'You are not authorized to perform this action',
                ]
            ]);
        }
        return $next($request);
    }
}

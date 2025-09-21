<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles  The roles that are allowed to access this route
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Unauthenticated'
                ], 401);
            }
            
            return redirect()->route('fe.auth.login');
        }

        $user = Auth::user();
        
        // Get user roles
        $userRoles = $user->roles->pluck('name')->toArray();
        
        // Check if user has any of the required roles
        $hasRequiredRole = !empty(array_intersect($roles, $userRoles));
        
        if (!$hasRequiredRole) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Access denied. You do not have the required role to access this resource.',
                    'required_roles' => $roles,
                    'user_roles' => $userRoles
                ], 403);
            }
            
            // For web requests, you can redirect to a 403 page or back with error
         return redirect()->route('errors.403');
        }

        return $next($request);
    }
}
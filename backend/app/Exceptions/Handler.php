<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];


    public function render($request, Throwable $exception)
    {
        if(str_contains($request->fullUrl(), 'api/')){
            if ($exception instanceof ValidationException) {
                $response = [
                    'message' => 'fail',
                    'errors' => $exception->errors(),
                ];

                return response()->json($response, 422);
            }

            if($exception instanceof NotFoundHttpException){
                $response = [
                    'message' => 'fail',
                    'errors' => [
                        'message' => 'Resource not found.'
                    ],
                ];

                return response()->json($response, 404);
            }
            if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                $response = [
                    'message' => 'fail',
                    'errors' => [
                        'message' => 'Unauthenticated',
                    ],
                ];

                return response()->json($response, 401);
            }
        }

        return parent::render($request, $exception);

    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}

<?php

namespace App\Traits;

use Symfony\Component\HttpFoundation\Response;

trait ApiFormatter
{

    public function successResponse($data = [], $message = 'success', $code = Response::HTTP_OK, $meta = [])
    {
        if ($data && $meta) {
            return response()->json([
                'code' => $code,
                'message' => $message,
                "meta" => $meta,
                'data' => $data
            ], $code);
        }
        if ($data) {
            return response()->json([
                'code' => $code,
                'message' => $message,
                'data' => $data
            ], $code);
        }
        return response()->json([
            'code' => $code,
            'message' => $message
        ], $code);
    }

    /**
     * Build error responses
     * @param  string|array $message
     * @param  int $code
     * @return Illuminate\Http\JsonResponse
     */
    public function errorResponse($message, $code)
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }
}

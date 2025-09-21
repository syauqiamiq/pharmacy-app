<?php

namespace App\Traits;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

trait HttpHelper
{
    protected $baseUri;
    public function setBaseUri($baseUri)
    {
        $this->baseUri = $baseUri;
    }


    public function performRequest($method, $requestUrl, $parameters = [], $headers = [], $body = []): Response
    {

        switch ($method) {
            case 'GET':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->get($this->baseUri . $requestUrl);
                return $response;
                break;
            case 'POST':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->post($this->baseUri . $requestUrl, $body);
                return $response;
                break;
            case 'PATCH':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->patch($this->baseUri . $requestUrl, $body);
                return $response;
                break;
            case 'PUT':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->put($this->baseUri . $requestUrl, $body);
                return $response;

                break;
            case 'DELETE':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->delete($this->baseUri . $requestUrl, $body);
                return $response;
                break;

            default:
                $client = Http::withOptions([
                    'base_uri' => $this->baseUri,
                ])->withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->get($requestUrl);
                return $response;
                break;
        }
    }

    private function authenticateDeltaSurya()
    {
        try {
            $response = $this->performRequest('POST', '/api/v1/auth', [], [], [
                'email' => 'syauqiamiq.work@gmail.com',
                'password' => '081336502325'
            ]);


            if ($response->status() === 200 && isset($response->json()['access_token'])) {
                Cache::put('delta_surya_api_token', $response->json()['access_token'], 86400);
            } else {
                // Handle external API error response
                $errorMessage = $this->extractErrorMessage($response, 'Authentication failed');
                throw new BadRequestException($errorMessage);
            }
        } catch (\Throwable $th) {
            // If it's already a BadRequestException, re-throw it
            if ($th instanceof BadRequestException) {
                throw $th;
            }
            // Otherwise, wrap it
            throw new BadRequestException('Authentication failed: ' . $th->getMessage());
        }
    }

    /**
     * Extract error message from external API response
     * 
     * @param \Illuminate\Http\Client\Response $response
     * @param string $defaultMessage
     * @return string
     */
    protected function extractErrorMessage($response, $defaultMessage = 'Request failed')
    {
        $responseData = $response->json();
        
        // Try to get error message in order of preference
        if ($responseData && isset($responseData['error'])) {
            return $responseData['error'];
        }
        
        if ($responseData && isset($responseData['message'])) {
            return $responseData['message'];
        }
        
        if ($responseData && isset($responseData['detail'])) {
            return $responseData['detail'];
        }
        
        // If no specific error message, return default with status code
        return $defaultMessage . ' (Status: ' . $response->status() . ')';
    }
}

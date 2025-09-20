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

    /**
     * Send a request to any service
     * @return string
     */
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
            $response = $this->performRequest('POST', '/api/v1/auth', [],[],[
                'email' => 'syauqiamiq.work@gmail.com',
                'password' => '081336502325'
            ]);


            if ($response->status() === 200 && isset($response->json()['access_token'])) {
                Cache::put('delta_surya_api_token', $response->json()['access_token'], 86400);
            } else {
                throw new BadRequestException('Authentication failed');
            }
        } catch (\Throwable $th) {
            throw new BadRequestException('Authentication failed: ' . $th->getMessage());
        }
    }
}

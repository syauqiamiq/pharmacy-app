<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

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
    public function performRequest($method, $requestUrl, $parameters = [], $headers = [], $body = [])
    {

        switch ($method) {
            case 'GET':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->get($this->baseUri . $requestUrl);
                return $response->json();
                break;
            case 'POST':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->post($this->baseUri . $requestUrl, $body);
                return $response->json();
                break;
            case 'PATCH':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->patch($this->baseUri . $requestUrl, $body);
                return $response->json();
                break;
            case 'PUT':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->put($this->baseUri . $requestUrl, $body);
                return $response->json();

                break;
            case 'DELETE':
                $client = Http::withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->delete($this->baseUri . $requestUrl, $body);
                return $response->json();
                break;

            default:
                $client = Http::withOptions([
                    'base_uri' => $this->baseUri,
                ])->withHeaders($headers)->withQueryParameters($parameters);
                $response = $client->get($requestUrl);
                return $response->json();
                break;
        }
    }
}

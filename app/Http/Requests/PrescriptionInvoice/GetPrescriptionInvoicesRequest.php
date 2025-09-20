<?php

namespace App\Http\Requests\PrescriptionInvoice;

use Illuminate\Foundation\Http\FormRequest;

class GetPrescriptionInvoicesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'limit' => 'sometimes|integer|min:1|max:100',
            'search' => 'sometimes|string|max:255',
            'orderBy' => 'sometimes|string|max:50',
            'sort' => 'sometimes|string|in:ASC,DESC,asc,desc',
            'fromDate' => 'sometimes|date|date_format:Y-m-d',
            'toDate' => 'sometimes|date|date_format:Y-m-d|after_or_equal:fromDate',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'limit.integer' => 'Limit must be an integer',
            'limit.min' => 'Limit must be at least 1',
            'limit.max' => 'Limit must not exceed 100',
            'search.string' => 'Search must be a string',
            'search.max' => 'Search must not exceed 255 characters',
            'orderBy.string' => 'Order by must be a string',
            'orderBy.max' => 'Order by must not exceed 50 characters',
            'sort.string' => 'Sort must be a string',
            'sort.in' => 'Sort must be either ASC or DESC',
            'fromDate.date' => 'From date must be a valid date',
            'fromDate.date_format' => 'From date must be in Y-m-d format',
            'toDate.date' => 'To date must be a valid date',
            'toDate.date_format' => 'To date must be in Y-m-d format',
            'toDate.after_or_equal' => 'To date must be after or equal to from date',
        ];
    }
}

<?php

namespace App\Http\Requests\Prescription;

use Illuminate\Foundation\Http\FormRequest;

class GetPrescriptionsRequest extends FormRequest
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
            'limit' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string|max:255',
            'orderBy' => 'nullable|string|in:id,created_at,updated_at,status,doctor_name,patient_name',
            'sort' => 'nullable|string|in:ASC,DESC,asc,desc',
            'fromDate' => 'nullable|date',
            'toDate' => 'nullable|date|after_or_equal:fromDate',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'limit.integer' => 'Limit must be a number',
            'limit.min' => 'Limit must be at least 1',
            'limit.max' => 'Limit cannot exceed 100',
            'search.max' => 'Search term cannot exceed 255 characters',
            'orderBy.in' => 'Order by must be one of: id, created_at, updated_at, status, doctor_name, patient_name',
            'sort.in' => 'Sort must be either ASC or DESC',
            'fromDate.date' => 'From date must be a valid date',
            'toDate.date' => 'To date must be a valid date',
            'toDate.after_or_equal' => 'To date must be after or equal to from date',
        ];
    }
}
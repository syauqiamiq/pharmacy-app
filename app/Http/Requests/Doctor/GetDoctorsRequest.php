<?php

namespace App\Http\Requests\Doctor;

use Illuminate\Foundation\Http\FormRequest;

class GetDoctorsRequest extends FormRequest
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
            'limit' => 'integer|min:1|max:100',
            'search' => 'string|nullable',
            'orderBy' => 'string|nullable|in:id,specialization,license_number,created_at,updated_at',
            'sort' => 'string|nullable|in:ASC,DESC,asc,desc',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'limit.integer' => 'Limit harus berupa angka.',
            'limit.min' => 'Limit minimal 1.',
            'limit.max' => 'Limit maksimal 100.',
            'orderBy.in' => 'Order by hanya boleh: id, specialization, license_number, created_at, updated_at.',
            'sort.in' => 'Sort hanya boleh: ASC, DESC.',
        ];
    }
}
<?php

namespace App\Http\Requests\Doctor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDoctorRequest extends FormRequest
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
        $doctorId = $this->route('doctor');
        
        return [
            'user_id' => 'string|nullable|exists:users,id',
            'specialization' => 'string|nullable|max:255',
            'license_number' => [
                'string',
                'nullable',
                'max:50',
                Rule::unique('doctors', 'license_number')->ignore($doctorId)
            ],
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
            'user_id.string' => 'User ID harus berupa teks.',
            'user_id.exists' => 'User tidak ditemukan.',
            'specialization.string' => 'Spesialisasi harus berupa teks.',
            'specialization.max' => 'Spesialisasi maksimal 255 karakter.',
            'license_number.string' => 'Nomor lisensi harus berupa teks.',
            'license_number.unique' => 'Nomor lisensi sudah terdaftar.',
            'license_number.max' => 'Nomor lisensi maksimal 50 karakter.',
        ];
    }
}
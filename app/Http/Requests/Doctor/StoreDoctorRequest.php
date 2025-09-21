<?php

namespace App\Http\Requests\Doctor;

use Illuminate\Foundation\Http\FormRequest;

class StoreDoctorRequest extends FormRequest
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
            'user_id' => 'string|required|exists:users,id',
            'specialization' => 'string|required|max:255',
            'license_number' => 'string|required|unique:doctors,license_number|max:50',
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
            'user_id.required' => 'User ID harus diisi.',
            'user_id.string' => 'User ID harus berupa teks.',
            'user_id.exists' => 'User tidak ditemukan.',
            'specialization.required' => 'Spesialisasi harus diisi.',
            'specialization.string' => 'Spesialisasi harus berupa teks.',
            'specialization.max' => 'Spesialisasi maksimal 255 karakter.',
            'license_number.required' => 'Nomor lisensi harus diisi.',
            'license_number.string' => 'Nomor lisensi harus berupa teks.',
            'license_number.unique' => 'Nomor lisensi sudah terdaftar.',
            'license_number.max' => 'Nomor lisensi maksimal 50 karakter.',
        ];
    }
}
<?php

namespace App\Http\Requests\Anamnesis;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnamnesisRequest extends FormRequest
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
            'visit_id' => 'required|string|exists:visits,id',
            'patient_complaint' => 'nullable|string|max:1000',
            'present_illness' => 'nullable|string|max:1000',
            'past_illness' => 'nullable|string|max:1000',
            'allergy_history' => 'nullable|string|max:1000',
            'family_history' => 'nullable|string|max:1000',
            'madication_history' => 'nullable|string|max:1000',
            'physical_exam' => 'nullable|string|max:1000',
            'note' => 'nullable|string|max:1000',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:pdf,png,jpg,jpeg,doc,docx,xls,xlsx|max:10192',
            'anamnesis_details' => 'nullable|array',
            'anamnesis_details.*.key' => 'required_with:anamnesis_details|string|max:255',
            'anamnesis_details.*.value' => 'required_with:anamnesis_details|string|max:255',
            'anamnesis_details.*.unit' => 'nullable|string|max:50',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'visit_id.required' => 'Visit ID is required',
            'visit_id.exists' => 'Selected visit does not exist',
            'patient_complaint.max' => 'Patient complaint cannot exceed 1000 characters',
            'present_illness.max' => 'Present illness cannot exceed 1000 characters',
            'past_illness.max' => 'Past illness cannot exceed 1000 characters',
            'allergy_history.max' => 'Allergy history cannot exceed 1000 characters',
            'family_history.max' => 'Family history cannot exceed 1000 characters',
            'madication_history.max' => 'Medication history cannot exceed 1000 characters',
            'physical_exam.max' => 'Physical exam cannot exceed 1000 characters',
            'note.max' => 'Note cannot exceed 1000 characters',
            'anamnesisDetails.array' => 'Anamnesis details must be an array',
            'anamnesisDetails.*.key.required_with' => 'Detail key is required when anamnesis details are provided',
            'anamnesisDetails.*.key.max' => 'Detail key cannot exceed 255 characters',
            'anamnesisDetails.*.value.required_with' => 'Detail value is required when anamnesis details are provided',
            'anamnesisDetails.*.value.max' => 'Detail value cannot exceed 255 characters',
            'anamnesisDetails.*.unit.max' => 'Detail unit cannot exceed 50 characters',
        ];
    }
}
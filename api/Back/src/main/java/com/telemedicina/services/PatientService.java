package com.telemedicina.services;

import com.telemedicina.entitys.Patient;
import com.telemedicina.repositorys.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    public Patient registerPatient (Patient patient, Integer id_user){
        Patient patient_db = patientRepository.findByIdPatient(id_user);
        if(patient_db != null) {
            patient.setId_user(id_user);
            return this.patientRepository.save(patient);
        }
        return null;
    }

}
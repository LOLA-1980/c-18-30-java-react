import React, { useState } from 'react';
import {  Field, ErrorMessage } from 'formik';



const MedicalHistory = ({values, setFieldValue }) => {
  const [medication, setMedication] = useState(false);


  const handleChronicDiseases = () =>{
    if (values.enfermedadesCronicas.includes('ninguna') && values.enfermedadesCronicas.includes('Diabetes') ) {
      const array = values.enfermedadesCronicas.filter((element) => element !== 'Diabetes')
      setFieldValue('enfermedadesCronicas', array);
    }
    setFieldValue('enfermedadesCronicas', ['ninguna'])
    setFieldValue('otrasEnfermedades', '')

  }
  const handleFamilyHistory = () =>{
    setFieldValue('historiaFamiliar', ['ninguna'])
    setFieldValue('otrasEnfermedadesFamilia', '')
   
  }

  const handleAlergy = () =>{
    setFieldValue('alergias', ['ninguna'])
    setFieldValue('alergiasMedicamentosDescripcion', '')
    setFieldValue('alergiasAlimentosDescripcion', '')
    setFieldValue('alergiasAmbientalesDescripcion', '')
    setFieldValue('otrasAlergiasDescripcion', '')
    setFieldValue('alergiasMedicamentos', 'no')
    setFieldValue('alergiasAlimentos', 'no')
    setFieldValue('alergiasAmbientales', 'no')
    setFieldValue('otrasAlergias', 'no')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
   

            <h2 className="text-xl font-bold">Historia Clínica</h2>
            
            <h3 className="text-lg font-semibold mt-5">Antecedentes Médicos Personales</h3>
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700">Enfermedades Crónicas:</label>
              <label>
                <Field type="checkbox" name="enfermedadesCronicas" value="Diabetes" className="mr-2" disabled={values.enfermedadesCronicas.includes('ninguna')} />
                Diabetes
              </label>
              <label>
                <Field type="checkbox" name="enfermedadesCronicas" value="Hipertensión" className="mr-2" disabled={values.enfermedadesCronicas.includes('ninguna')} />
                Hipertensión
              </label>
              <label>
                <Field type="checkbox" name="enfermedadesCronicas" value="Asma" className="mr-2" disabled={values.enfermedadesCronicas.includes('ninguna')} />
                Asma
              </label>
              <label>
                <Field type="checkbox" name="enfermedadesCronicas" value="ninguna" className="mr-2"  onClick={handleChronicDiseases} />
                  Ninguna
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mt-3">Otras:</label>
              <Field name="otrasEnfermedades" className="w-full p-2 border rounded-md" />
              <ErrorMessage name="otrasEnfermedades" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 mt-3">Cirugías anteriores:</label>
              <label>
                <Field type="radio" name="cirugias" value="si" className="mr-2 mt-3" />
                Sí
              </label>
              <label>
                <Field type="radio" name="cirugias" value="no" className="mr-2 mt-3" />
                No
              </label>
            </div>
            {values.cirugias === 'si' && (
              <div>
                <label className="block text-gray-700">Cuál:</label>
                <Field name="cirugiasAnteriores" className="w-full p-2 border rounded-md" />
                <ErrorMessage name="cirugiasAnteriores" component="div" className="text-red-600 text-sm" />
              </div>
            )}


            <h3 className="text-lg font-semibold mt-5">Historia Familiar de Enfermedades</h3>
            <div className="flex items-center space-x-4">
              <label>
                <Field type="checkbox" name="historiaFamiliar" value="Diabetes" className="mr-2" disabled={values.historiaFamiliar.includes('ninguna')}  />
                Diabetes
              </label>
              <label>
                <Field type="checkbox" name="historiaFamiliar" value="Hipertensión" className="mr-2" disabled={values.historiaFamiliar.includes('ninguna')} />
                Hipertensión
              </label>
              <label>
                <Field type="checkbox" name="historiaFamiliar" value="Asma" className="mr-2" disabled={values.historiaFamiliar.includes('ninguna')} />
                Asma
              </label>         
              <label>
                <Field type="checkbox" name="historiaFamiliar" value="ninguna" className="mr-2"  onClick={handleFamilyHistory} />
                Ninguna
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mt-3">Otras:</label>
              <Field name="otrasEnfermedadesFamilia" className="w-full p-2 border rounded-md" />
              <ErrorMessage name="otrasEnfermedadesFamilia" component="div" className="text-red-600 text-sm" />
            </div>

            <h3 className="text-lg font-semibold mt-5">¿Alergias?</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <label className="block text-gray-700">Medicamentos:</label>
                <label>
                  <Field type="radio" name="alergiasMedicamentos" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="alergiasMedicamentos" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.alergiasMedicamentos === 'si'  && !values.alergias.includes('ninguna') && (
                <div>
                  <label className="block text-gray-700">Cuál:</label>
                  <Field name="alergiasMedicamentosDescripcion" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="alergiasMedicamentosDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <label className="block text-gray-700">Alimentos:</label>
                <label>
                  <Field type="radio" name="alergiasAlimentos" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="alergiasAlimentos" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.alergiasAlimentos === 'si'  && !values.alergias.includes('ninguna') && (
                <div>
                  <label className="block text-gray-700">Cuál:</label>
                  <Field name="alergiasAlimentosDescripcion" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="alergiasAlimentosDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <label className="block text-gray-700">Ambientales:</label>
                <label>
                  <Field type="radio" name="alergiasAmbientales" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="alergiasAmbientales" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.alergiasAmbientales === 'si'  && !values.alergias.includes('ninguna') && (
                <div>
                  <label className="block text-gray-700">Cuál:</label>
                  <Field name="alergiasAmbientalesDescripcion" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="alergiasAmbientalesDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <label className="block text-gray-700">Otros:</label>
                <label>
                  <Field type="radio" name="otrasAlergias" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="otrasAlergias" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.otrasAlergias === 'si' && !values.alergias.includes('ninguna') && (
                <div>
                  <label className="block text-gray-700">Cuál:</label>
                  <Field name="otrasAlergiasDescripcion" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="otrasAlergiasDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <label>
                  <Field type="checkbox" name="alergias" value="ninguna" onClick={handleAlergy} />
                  Ninguna
                </label>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-3">¿Tomas medicamento?</h3>
            <div className="flex items-center space-x-4">
              <label>
                <Field type="radio" name="tomaMedicamento" value="si" className="mr-2" onClick={() => setMedication(true)} />
                Sí
              </label>
              <label>
                <Field type="radio" name="tomaMedicamento" value="no" className="mr-2" onClick={() => setMedication(false)} />
                No
              </label>
            </div>
            {medication && (
              <div>
                <div>
                  <label className="block text-gray-700">Medicamento:</label>
                  <Field name="medicamento" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="medicamento" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700">Dosis:</label>
                  <Field name="dosis" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="dosis" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700">Frecuencia:</label>
                  <Field name="frecuencia" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="frecuencia" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
            )}
            <div className="flex items-center">
              <Field type="checkbox" name="consentimiento" className="mr-2 mt-3" />
              <label className="text-gray-700 mt-3">Acepto los términos y condiciones y doy mi consentimiento para el tratamiento virtual y el manejo de mis datos.</label>
              <ErrorMessage name="consentimiento" component="div" className="text-red-600 text-sm" />
            </div>
    </div>
  );
};

export default MedicalHistory;

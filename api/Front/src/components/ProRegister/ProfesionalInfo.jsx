import React, { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";


const ProfesionalInfo =({ setFieldValue }) => {

  const { values } = useFormikContext();
  const [experiencias, setExperiencias] = useState([]);

  const addExperience = () => {
    if (experiencias.length < 3) {
      const newExperience = { cargo: '', lugar: '', Fechainicio: '', FechaFinal: '', actualmente: 'No', closed: false };
      const updatedExperiences = [...experiencias, newExperience];
      setExperiencias(updatedExperiences);
      setFieldValue('experiencias', updatedExperiences);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiencias.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp));
    setExperiencias(updatedExperiences);
    setFieldValue('experiencias', updatedExperiences);
  };

  const handleExperienceRemove = (index) => {
    const updatedExperiences = experiencias.filter((_, i) => i !== index);
    setExperiencias(updatedExperiences);
    setFieldValue('experiencias', updatedExperiences);
  };

    return (
    <>
    <h1 className="text-2xl font-bold mb-6 text-purple-600">Datos Profesionales</h1>
    <div className="flex space-x-4">
        <div className="w-1/2">
            <Field as="select" className="w-full px-3 py-2 border rounded" name="especialidad">
            <option value="">Especializacion</option>
            <option value="Medico Clinico">Medico Clinico</option>
            <option value="Psicologo">Psicologo</option>
            <option value="Nutricionista">Nutricionista</option>

            </Field>
            <ErrorMessage className="text-red-500 text-sm" name="especialidad" component="div" />
        </div>
        <div className="w-1/2">
        <Field className="w-full px-3 py-2 border rounded" name="numeroMatricula" placeholder='Número de Matricula' />
        <ErrorMessage className="text-red-500 text-sm" name="numeroMatricula" component="div" />
        </div>

    </div> 
  <div>
        <label className="block text-black font-medium">Certificacion Profesional</label>
        <input
            name="certificado"
            type="file"
            className="w-full px-3 py-2 border rounded"
            onChange={(event) => {
            setFieldValue("certificado", event.currentTarget.files[0]);
            }}
        />
        <ErrorMessage className="text-red-500 text-sm" name="certificado" component="div" />
    </div>
    <div>
      <Field as="select" className="w-full px-3 py-2 border rounded" name="experiencia">
        <option value="">Años de experiencia</option>
        <option value="1-2">1 a 2 años</option>
        <option value="3-5">3 a 5 años</option>
        <option value="6-10">6 a 10 años</option>
        <option value="mas">Mas</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="experiencia" component="div" />
    </div>
    
    <div>
      <Field as="select" className="w-full px-3 py-2 border rounded" name="universidad">
        <option value="">Universidad</option>
        <option value="Universidad de Cuyo">Universidad de Cuyo</option>
        <option value="Universidad de Mexico">Universidad de Mexico</option>
        <option value="Universidad de Buenos Aires">Universidad de Buenos Aires</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="universidad" component="div" />

      <Field className="w-full px-3 py-2 border rounded mt-5" name="egreso" placeholder='Año de egreso' />
        <ErrorMessage className="text-red-500 text-sm" name="egreso" component="div" />
    </div>
    <div>
    <Field className="w-full px-3 py-2 border rounded" name="especialidadType" placeholder='Tipo de especialidad' />
        <ErrorMessage className="text-red-500 text-sm" name="especialidadType" component="div" />
    </div>
  
    <div>
      <div className='flex justify-between'>
    <h1 className="text-2xl font-bold mb-6 text-purple-600">Experiencia Laboral</h1>
    {experiencias.length < 3 && (
        <button
          type="button"
          className="px-4 py-2  text-black rounded"
          onClick={addExperience}
        >
         <FaPlus />
        </button>
      )}
      </div>
      {experiencias.map((experiencia,index) => experiencia.closed && (
        <div key={index} className="mb-6 border p-4 rounded flex justify-between items-center">
          <p>{experiencia.cargo}</p>
          <div className='flex'>
            <button className='px-4 py-2 mx-1 bg-indigo-700 text-white rounded' type='button' onClick={(e) => handleExperienceChange(index, 'closed', false)}>
              <MdEdit /></button>
            <button type="button" className="px-4 py-2 mx-1 bg-red-600 text-white rounded" onClick={() => handleExperienceRemove(index)}>
              <MdDelete /></button>
          </div>
        </div>
      ))}
      {experiencias.length < 1 && (
        <div className='h-[100px] bg-white'>

        </div>
      )}
      {experiencias.map((experiencia, index) => !experiencia.closed && (
        <div key={index} className="mb-6 border p-4 rounded">
          <Field
            className="w-full px-3 py-2 border rounded"
            name={`experiencias[${index}].cargo`}
            placeholder="Cargo"
            value={experiencia.cargo}
            onChange={(e) => handleExperienceChange(index, 'cargo', e.target.value)}
          />
          <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].cargo`} component="div" />

          <Field
            className="w-full px-3 py-2 border rounded mt-5"
            name={`experiencias[${index}].lugar`}
            placeholder="Lugar"
            value={experiencia.lugar}
            onChange={(e) => handleExperienceChange(index, 'lugar', e.target.value)}
          />
          <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].lugar`} component="div" />

          <div className="flex mt-5">
            <div className="w-1/2 pr-2">
              <Field
                className="w-full px-3 py-2 border rounded"
                type="date"
                name={`experiencias[${index}].Fechainicio`}
                placeholder="Fecha de inicio"
                value={experiencia.Fechainicio}
                onChange={(e) => handleExperienceChange(index, 'Fechainicio', e.target.value)}
              />
              <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].Fechainicio`} component="div" />
            </div>
            <div className="w-1/2 pl-2">
              <Field
                className="w-full px-3 py-2 border rounded"
                type="date"
                name={`experiencias[${index}].FechaFinal`}
                placeholder="Fecha de finalización"
                value={experiencia.FechaFinal}
                onChange={(e) => handleExperienceChange(index, 'FechaFinal', e.target.value)}
                disabled={experiencia.actualmente === 'Si'}
              />
              <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].FechaFinal`} component="div" />
            </div>
          </div>

          <label className="block text-gray-700 mt-5">Actualmente trabajo aquí</label>
          <div className="flex">
            <label className="flex items-center ml-3">
              <Field
                type="radio"
                name={`experiencias[${index}].actualmente`}
                value="Si"
                checked={experiencia.actualmente === 'Si'}
                onChange={(e) => handleExperienceChange(index, 'actualmente', 'Si')}
                className="mr-2"
              />
              Si
            </label>
            <label className="flex items-center ml-3">
              <Field
                type="radio"
                name={`experiencias[${index}].actualmente`}
                value="No"
                checked={experiencia.actualmente === 'No'}
                onChange={(e) => handleExperienceChange(index, 'actualmente', 'No')}
                className="mr-2"
              />
              No
            </label>
          </div>

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => handleExperienceRemove(index)}
          >
            Eliminar Experiencia
          </button>
          <button
            type="button"
            className="mt-4 ml-4 px-4 py-2 bg-blue-400 text-white rounded"
            onClick={(e) => handleExperienceChange(index, 'closed', true)}
          >
            Guardar Experiencia
          </button>
        </div>
      ))}


    </div>
    </>
)
}
export default ProfesionalInfo;
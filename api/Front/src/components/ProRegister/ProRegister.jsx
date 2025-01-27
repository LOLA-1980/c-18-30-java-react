import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PersonalInfo from './PersonalInfo';
import ProfesionalInfo from './ProfesionalInfo';
import StepIndicator from '../Utils/step';
import MedicConsultInfo from './MedicConsult';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { obrasArray } from './MedicConsult';
import { email } from '../Utils/emails';

const SignupSchema = Yup.object().shape({
  //Personal Info
  nombre: Yup.string().required('Ingrese un nombre'),
  apellido: Yup.string().required('Ingrese un apellido'),
  email: Yup.string().email('Email inválido').required('Ingrese un email')
  .test('email-exists', 'Este email ya está en uso', function (value) {
    return !email.includes(value);
  }),
  codigoPais: Yup.string().required('Ingrese un Codigo de pais'),
  numeroCelular: Yup.string().required('Ingrese un Numero de celular ')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  sexo: Yup.string().required('Elija una opcion'),
  localidad: Yup.string().required('Seleccione una localidad'),
  pais: Yup.string().required('Ingrese un pais '),
  estado: Yup.string().required('Ingrese un Estado/Provincia/Región '),
  codigoPostal: Yup.string().required('Ingrese el codigo postal '),
  domicilio: Yup.string().required('Ingrese el domicilio '),
  dni: Yup.string().required('Ingrese el DNI')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  nacimiento: Yup.date(),
  fotoPerfil: Yup.mixed().required('Ingrese una foto de perfil'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
  confirmarPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Ingrese la contraseña '),
//ProfesionalInfo
    especialidad: Yup.string().required('La especialización es obligatoria'),
    numeroMatricula: Yup.string().required('El número de matrícula es obligatorio')
    .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
    certificado: Yup.mixed().required('El certificado profesional es obligatorio'),
  experiencia: Yup.string().required('Los años de experiencia son obligatorios'),
    universidad: Yup.string().required('La universidad es obligatoria'),
    egreso: Yup.number()
    .typeError('Debe ser un número')
    .required('El año de egreso es obligatorio')
    .min(1960, 'Debe ser un año válido')
    .max(new Date().getFullYear(), 'No puede ser un año futuro'),
    especialidadType: Yup.string().required('El tipo de especialidad es obligatoria'),
    experiencias: Yup.array().of(
      Yup.object().shape({
        cargo: Yup.string().required('El cargo es obligatorio'),
        lugar: Yup.string().required('El lugar es obligatorio'),
        Fechainicio: Yup.date()
          .typeError('Debe ser una fecha válida')
          .required('La fecha de inicio es obligatoria'),
        FechaFinal: Yup.date()
          .typeError('Debe ser una fecha válida')
          .nullable()
          .test('is-required-if-not-current', 'La fecha de finalización es obligatoria si no trabajas actualmente', function(value) {
            const { actualmente } = this.parent;
            return actualmente === 'No' ? value != null : true;
          })
          .test('is-after-start-date', 'La fecha de finalización debe ser posterior a la fecha de inicio', function(value) {
            const { Fechainicio, actualmente } = this.parent;
            if (actualmente === 'Si') {
              return true;
            }
            return value && Fechainicio ? new Date(value) > new Date(Fechainicio) : true;
          }),
        actualmente: Yup.string().required('Este campo es obligatorio'),
      })
    ).max(3, 'Solo se pueden añadir hasta 3 experiencias laborales'),
    
    //MedicConsult
    tipoConsulta: Yup.string().required('Selecciona un tipo de consulta').strict(),
    costoConsultaVirtual: Yup.number()
    .typeError('Debe ser un número')
    .test('is-required-virtual', 'Este campo es obligatorio', function(value) {
      const tipoConsulta = this.parent.tipoConsulta;
      return tipoConsulta === 'virtual' || tipoConsulta === 'ambas' ? !!value : true;
    }),
    days: 
      Yup.object().shape({
        lunes: Yup.object().shape({
          inicio: Yup.string().required('La hora de inicio es obligatorio'),
          final: Yup.string().required('La hora final es obligatorio'),
        }),
        martes: Yup.object().shape({
          inicio: Yup.string().required('La hora de inicio es obligatorio'),
          final: Yup.string().required('La hora final es obligatorio'),
        }),
        miercoles: Yup.object().shape({
          inicio: Yup.string().required('La hora de inicio es obligatorio'),
          final: Yup.string().required('La hora final es obligatorio'),
        }),
        jueves: Yup.object().shape({
          inicio: Yup.string().required('La hora de inicio es obligatorio'),
          final: Yup.string().required('La hora final es obligatorio'),
        }),
        viernes: Yup.object().shape({
          inicio: Yup.string().required('La hora de inicio es obligatorio'),
          final: Yup.string().required('La hora final es obligatorio'),
        }),
       
      }),
    
  costoConsultaPresencial: Yup.number()
    .typeError('Debe ser un número')
    .test('is-required-presencial', 'Este campo es obligatorio ', function(value) {
      const tipoConsulta = this.parent.tipoConsulta;
      return tipoConsulta === 'presencial' || tipoConsulta === 'ambas' ? !!value : true;
    }),
  
  consultaDuracion: Yup.string().required('Selecciona la duración de la consulta'),
  tipoPacientes: Yup.array().of(Yup.string()).min(1, 'Selecciona al menos un tipo de paciente'),
  metodoCobro: Yup.array()
  .of(Yup.string())
  .test('metodo-cobro-required', 'Selecciona al menos un método de cobro', function (value) {
    return value && value.length > 0;
  }),
  obraSocial: Yup.array().test('obra-social-required', 'Selecciona al menos una obra social válida', function(value) {
    const metodoCobro = this.parent.metodoCobro;
    const isObraSocialSelected = metodoCobro && metodoCobro.includes('obraSocial');
    const obraSocialValue = this.parent.obraSocial;
  
    if (isObraSocialSelected && Array.isArray(obraSocialValue)) {
      // Verifica si al menos uno de los elementos del array obraSocialValue está incluido en obrasArray
      const containsValidOption = obraSocialValue.some(option => obrasArray.includes(option));
      return containsValidOption;
    }
    return true; // No es necesario validar si no está seleccionada la obra social
  }),

    numeroCuenta: Yup.string().test('numero-cuenta-required', 'Ingresa el número de cuenta', function(value) {
      const metodoCobro = this.parent.metodoCobro;
      if (metodoCobro && metodoCobro.includes('transferencia')) {
        return !!value;
      }
      return true; 
    })
    .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  nombreTitular: Yup.string().test('nombre-titular-required', 'Ingresa el nombre del titular de la cuenta', function(value) {
      const metodoCobro = this.parent.metodoCobro;
      if (metodoCobro && metodoCobro.includes('transferencia')) {
        return !!value;
      }
      return true; 
    }),
  cvuAlias: Yup.string().test('cvu-alias-required', 'Ingresa el CVU o alias', function(value) {
      const metodoCobro = this.parent.metodoCobro;
      if (metodoCobro && metodoCobro.includes('transferencia')) {
        return !!value;
      }
      return true; 
    })
    .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  efectivo: Yup.array().test('efectivo-required', 'Selecciona al menos una forma de pago válida', function(value) {
    const metodoCobro = this.parent.metodoCobro;
    const isefectivoSelected = metodoCobro && metodoCobro.includes('efectivo');
    const efectivoValue = this.parent.efectivo;
  
    if (isefectivoSelected && Array.isArray(efectivoValue)) {
      // Verifica si al menos uno de los elementos del array obraSocialValue está incluido en obrasArray
      const containsValidOption = efectivoValue.some(option => ['Pago Facil', 'Rapipago'].includes(option));
      return containsValidOption;
    }
    return true; // No es necesario validar si no está seleccionada la obra social
  }),
  
  consentimiento: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones'),
});

const ProRegister = () => {
  const [step, setStep] = useState(1);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate()
  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const handleSubmit = () => setSubmit(true)
  

  return (
    <div>
      <div>
      <StepIndicator step={step} setStep={setStep} />
      </div>
  
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          email: '',
          codigoPais: '',
          numeroCelular: '',
          sexo: '',
          localidad: '',
          pais: '',
          estado: '', 
          codigoPostal: '',
          domicilio: '',
          dni: '',
          nacimiento: '',
          fotoPerfil: null,
          password: '',
          confirmarPassword: '',
          especialidad: '',
          numeroMatricula: '',
          certificado: null,
          experiencia: '',
          universidad: '',
          egreso: '',
          especialidadType: '',
          experiencias: [],
          //cargo: '',
         // lugar: '',
          //Fechainicio: '',
          //FechaFinal: '',
          //actualmente: '',
          tipoConsulta: '',
          days: {},
          costoConsultaVirtual: '',
          costoConsultaPresencial: '',
          consultaDuracion: '',
          tipoPacientes: [],
          metodoCobro: [],
          obraSocial: [],
          numeroCuenta: '',
          nombreTitular: '',
          cvuAlias: '',
          efectivo: [],
          consentimiento: false,

        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          if(submit && step===3 ){
            console.log(values);
            Swal.fire('Registrado correctamente', '', 'success')
           // navigate('/')
          setSubmit(false)
        } else return
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            {step === 1 && <PersonalInfo  setFieldValue={setFieldValue} />}
            {step === 2 && <ProfesionalInfo  setFieldValue={setFieldValue} />}
            {step === 3 && <MedicConsultInfo  setFieldValue={setFieldValue} />}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={handlePrevious}
                >
                  Anterior
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={handleNext}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};

export default ProRegister;

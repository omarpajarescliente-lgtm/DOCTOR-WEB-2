export interface TreatmentData {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  cardDesc: string;
  heroDesc: string;
  timeApprox: string;
  hospitalizationTime: string;
  returnToWorkTime: string;
  paraQueSub: string;
  benefits: Array<{ title: string; desc: string }>;
  indicacionesList: string[];
  indicacionesDisclaimer: string;
  longTermBannerTitle: string;
  longTermBannerSub: string;
  faqs: Array<{ q: string; a: string }>;
}

export const TREATMENTS: TreatmentData[] = [
  {
    id: 'prp',
    title: "Plasma Rico en Plaquetas (PRP)",
    shortTitle: "PRP Ecoguiado",
    subtitle: "Infiltración Biológica Autóloga para Regeneración Articular y Tendinosa",
    badge: "Inyección Biológica Autóloga",
    cardDesc: "Inyecciones de factores de crecimiento de tu propia sangre para reparar cartílago y tendones con ecografía in situ.",
    heroDesc: "El tratamiento de Plasma Rico en Plaquetas (PRP) consiste en la aplicación ecoguiada de factores de crecimiento autólogos concentrados para desinflamar intensamente y estimular la reparación biológica de articulaciones, ligamentos y tendones.",
    timeApprox: "30 A 45 MINUTOS",
    hospitalizationTime: "Ambulatorio (0 horas)",
    returnToWorkTime: "Inmediato / 24 horas",
    paraQueSub: "Los beneficios del tratamiento de Plasma Rico en Plaquetas (PRP) ecoguiado son:",
    benefits: [
      {
        title: "Alivio significativo del dolor",
        desc: "Reducción progresiva de la inflamación articular y tendinosa de manera sostenida, sin necesidad de consumir fármacos analgésicos crónicos."
      },
      {
        title: "Estimula la reparación del tejido",
        desc: "Los factores de crecimiento plaquetarios reactivan la biosíntesis de colágeno en cartílagos, tendones dañados y ligamentos desgastados."
      },
      {
        title: "Mínimo riesgo de complicaciones",
        desc: "Al procesarse a partir de una muestra de tu propia sangre, es un procedimiento 100% autólogo, seguro y libre de reacciones alérgicas o rechazo."
      }
    ],
    indicacionesList: [
      "Artrosis de rodilla, cadera, hombro o tobillo (grados I a III).",
      "Tendinitis crónica (manguito rotador, codo de tenista, tendón de Aquiles).",
      "Fascitis plantar recalcitrante y lesiones ligamentosas articulares."
    ],
    indicacionesDisclaimer: "El tratamiento de PRP NO es una solución mágica sin evaluación, sino una herramienta biológica altamente efectiva cuando se aplica con guía ecográfica de precisión.",
    longTermBannerTitle: "¡ESTE TRATAMIENTO MEJORA TU SALUD Y CALIDAD DE VIDA A LARGO PLAZO!",
    longTermBannerSub: "Incluyendo evaluación ecográfica in situ y plan de rehabilitación personalizado.",
    faqs: [
      {
        q: "¿CUÁL ES EL PRECIO O COSTO REFERENCIAL DEL TRATAMIENTO DE PLASMA RICO EN PLAQUETAS?",
        a: "Como referencia orientativa, la aplicación de Plasma Rico en Plaquetas (PRP) en una rodilla con ecografía articular in situ tiene un costo aproximado de S/ 600 soles una vez al mes. El plan exacto y número de sesiones se determina en la consulta médica presencial según la severidad del caso."
      },
      {
        q: "¿CÓMO SE REALIZA EL TRATAMIENTO DE PLASMA RICO EN PLAQUETAS?",
        a: "Se extrae una pequeña muestra de sangre del paciente, la cual se centrifuga en condiciones estériles para concentrar las plaquetas y sus factores de crecimiento. Luego, el Dr. Omar Pajares infiltra este concentrado con guía ecográfica directa en la zona lesionada."
      },
      {
        q: "¿CUÁNTAS SESIONES DE PRP SON NECESARIAS?",
        a: "Por lo general se recomiendan entre 1 y 3 sesiones espaciadas cada 21 a 30 días, según el grado de desgaste o inflamación determinado en la consulta ecográfica."
      },
      {
        q: "¿EL PROCEDIMIENTO ES DOLOROSO?",
        a: "Es un procedimiento ambulatorio y mínimamente invasivo. Se utiliza anestesia local fina y la guía por ecografía hace que la aplicación sea sumamente rápida y precisa."
      },
      {
        q: "¿CUÁNDO PUEDO VOLVER A MIS ACTIVIDADES DÍA A DÍA?",
        a: "Puedes retomar tus actividades cotidianas inmediatamente o al día siguiente. Se recomienda evitar ejercicios de alto impacto los primeros 3 a 5 días."
      }
    ]
  },
  {
    id: 'exosomas',
    title: "Terapia con Exosomas Celulares",
    shortTitle: "Exosomas Regenerativos",
    subtitle: "Biotecnología Nano-Celular de Alta Precisión para Artrosis Avanzada y Hernia Discal",
    badge: "Biotecnología Celular Avanzada",
    cardDesc: "Nano-vesículas ricas en microRNA y señales regenerativas para la reparación articular de rodilla y hernia discal lumbar.",
    heroDesc: "La terapia con Exosomas consiste en la aplicación ecoguiada de vesículas extracelulares purificadas de origen madre. Transportan cientos de proteínas regenerativas y factores de señalización celular para frenar la degeneración articular y desinflamar profundamente las raíces nerviosas en hernias discales.",
    timeApprox: "30 A 45 MINUTOS",
    hospitalizationTime: "Ambulatorio (0 horas)",
    returnToWorkTime: "24 horas",
    paraQueSub: "Los beneficios de la terapia con Exosomas Celulares son:",
    benefits: [
      {
        title: "Poderosa modulación antiinflamatoria y reparadora",
        desc: "Llegan directamente a la zona afectada sin requerir la presencia de células completas, acelerando la restauración tisular."
      },
      {
        title: "Ideal para Rodilla, Meniscos y Hernia Discal Lumbar",
        desc: "Especialmente efectivo en pacientes con artrosis severa de rodilla, lesiones de meniscos o comprimidos nerviosos por hernias en columna."
      },
      {
        title: "Infiltración ecoguiada con alta tolerancia",
        desc: "Procedimiento ambulatorio sin tiempo de inactividad prolongado ni complicaciones quirúrgicas."
      }
    ],
    indicacionesList: [
      "Artrosis severa de rodilla y desgaste de cartílago.",
      "Ruptura o degeneración de meniscos articulares.",
      "Hernias discales lumbares y ciática dolorosa.",
      "Artropatías y tendinopatías refractarias a otros tratamientos."
    ],
    indicacionesDisclaimer: "La terapia con Exosomas se aplica bajo guía ecográfica de alta precisión en el consultorio del Dr. Omar Pajares.",
    longTermBannerTitle: "¡NANO-TECNOLOGÍA CELULAR PARA REGENERAR TUS ARTICULACIONES Y COLUMNA!",
    longTermBannerSub: "Evaluación integral por el Médico Fisiatra e infiltración dirigida en punto exacto.",
    faqs: [
      {
        q: "¿QUÉ SON LOS EXOSOMAS EN MEDICINA REGENERATIVA?",
        a: "Son nano-vesículas producidas por células madre que contienen información genética (microRNA) y factores de crecimiento concentrados encargados de enviar la orden de reparación a los tejidos dañados."
      },
      {
        q: "¿SE NECESITA CIRUGÍA PARA APLICAR EXOSOMAS?",
        a: "No. Es un procedimiento ambulatorio que se realiza mediante infiltración ecoguiada in situ directamente en la zona afectada de la rodilla o columna."
      },
      {
        q: "¿PARA QUÉ CASOS ESTÁ INDICADO?",
        a: "Para artrosis de rodilla moderada a avanzada, degeneración de meniscos, hernias discales lumbares y dolores articulares persistentes."
      }
    ]
  },
  {
    id: 'celulas-madre',
    title: "Células Madre Mesenquimales",
    shortTitle: "Células Madre de Cordón",
    subtitle: "Terapia Biológica de Máxima Potencia para Artrosis Moderada a Severa",
    badge: "Alta Biotecnología Avanzada",
    cardDesc: "Máximo poder regenerativo para reparar cartílagos con desgaste avanzado y desacelerar la artrosis.",
    heroDesc: "La terapia de Células Madre Mesenquimales de cordón umbilical consiste en la aplicación ecoguiada de biológicos celulares con la más alta capacidad inmunomoduladora y reparadora para regenerar articulaciones severamente desgastadas.",
    timeApprox: "30 A 45 MINUTOS",
    hospitalizationTime: "Ambulatorio (0 horas)",
    returnToWorkTime: "24 a 48 horas",
    paraQueSub: "Los beneficios de la terapia regenerativa con Células Madre Mesenquimales son:",
    benefits: [
      {
        title: "Regeneración y modulación intensa",
        desc: "Elevado potencial biológico para detener el deterioro progresivo del cartílago y restaurar el ambiente interno de la articulación."
      },
      {
        title: "Alternativa real a la cirugía invasiva",
        desc: "Diseñado para pacientes con artrosis de rodilla o cadera que buscan evitar o diferir prótesis metálicas u operaciones riesgosas."
      },
      {
        title: "Infiltración de precisión milimétrica",
        desc: "Aplicación directa dentro de la cavidad articular guiada en tiempo real con ecógrafo de alta definición."
      }
    ],
    indicacionesList: [
      "Artrosis moderada a avanzada de rodilla, cadera u hombro.",
      "Desgaste articular severo con dolor al caminar o subir escaleras.",
      "Pacientes que no desean o tienen contraindicaciones para cirugía de prótesis."
    ],
    indicacionesDisclaimer: "Las Células Madre Mesenquimales NO requieren internamiento quirúrgico; es un tratamiento ambulatorio ecoguiado con protocolo médico estricto.",
    longTermBannerTitle: "¡PROTÉGETE Y REGENERA TUS ARTICULACIONES SIN QUIRÓFANO!",
    longTermBannerSub: "Acompañado de seguimiento ecográfico y orientación física por especialista en rehabilitación.",
    faqs: [
      {
        q: "¿DE DÓNDE PROVIENEN LAS CÉLULAS MADRE UTILIZADAS?",
        a: "Se utilizan células madre mesenquimales obtenidas de tejido de cordón umbilical procesadas bajo estrictas normas de laboratorio biotecnológico estéril (GMP)."
      },
      {
        q: "¿CUÁNTAS APLICACIONES SE REQUIEREN?",
        a: "En la mayoría de casos de artrosis articular, una sola aplicación ecoguiada de alta concentración es suficiente para obtener una mejoría sostenida por largo tiempo."
      },
      {
        q: "¿ES UN PROCEDIMIENTO SEGURO?",
        a: "Sí, es un procedimiento ambulatorio altamente seguro, inmunológicamente privilegiado, sin riesgo de transmisión de enfermedades ni rechazo."
      },
      {
        q: "¿QUÉ RESULTADOS PUEDO ESPERAR?",
        a: "Disminución marcada del dolor articular, mayor flexibilidad, capacidad para caminar mayores distancias y detención del avance destructivo de la artrosis."
      }
    ]
  },
  {
    id: 'proloterapia',
    title: "Proloterapia con Dextrosa",
    shortTitle: "Proloterapia Ligamentosa",
    subtitle: "Regeneración y Estabilidad de Ligamentos, Tendones y Cápsula Articular",
    badge: "Estabilidad Estructural Articular",
    cardDesc: "Fortalecimiento de ligamentos y tendones debilitados para eliminar la inestabilidad y el dolor crónico.",
    heroDesc: "La Proloterapia consiste en infiltraciones de soluciones estimulantes biológicas (dextrosa hiperosmolar) que reactivan la cascada curativa natural del cuerpo para engrosar y fortalecer ligamentos y tendones debilitados.",
    timeApprox: "20 A 30 MINUTOS",
    hospitalizationTime: "Ambulatorio (0 horas)",
    returnToWorkTime: "Inmediato",
    paraQueSub: "Los beneficios de la Proloterapia con Dextrosa ecoguiada son:",
    benefits: [
      {
        title: "Fortalecimiento de la estabilidad articular",
        desc: "Refuerza los ligamentos flojos o hiperlaxos, devolviendo el soporte mecánico a las articulaciones inestables."
      },
      {
        title: "Eliminación del dolor muscular y ligamentoso",
        desc: "Ideal para dolores crónicos de columna, ciática, tendinitis resistentes y esguinces que no terminaron de sanar."
      },
      {
        title: "Tratamiento natural y seguro",
        desc: "Estimula la producción autóloga de nuevo colágeno firme sin infiltrar corticoides ni químicos dañinos."
      }
    ],
    indicacionesList: [
      "Inestabilidad de rodilla, tobillo o hombro por esguinces antiguos.",
      "Dolor crónico de columna lumbar, sacroilíaco o hernia discal.",
      "Tendinitis rebelde, codo de tenista y dolor por sobrecarga física."
    ],
    indicacionesDisclaimer: "La Proloterapia reconstruye la estructura de soporte de las articulaciones de forma gradual y progresiva.",
    longTermBannerTitle: "¡RECUPERA LA ESTABILIDAD Y EL MOVIMIENTO LIBRE DE DOLOR!",
    longTermBannerSub: "Evaluación ecográfica personalizada para identificar los puntos exactos de laxitud.",
    faqs: [
      {
        q: "¿QUÉ ES EXACTAMENTE LA PROLOTERAPIA?",
        a: "Es una técnica médica de inyección que estimula al cuerpo a reparar sus propios ligamentos y tendones dañados mediante una solución biocompatible concentrada."
      },
      {
        q: "¿CUÁNTAS SESIONES SE NECESITAN?",
        a: "Se realizan habitualmente de 3 a 5 sesiones espaciadas cada 3 o 4 semanas para lograr una consolidación óptima de la firmeza ligamentosa."
      },
      {
        q: "¿TIENE EFECTOS SECUNDARIOS?",
        a: "Puede haber una leve inflamación o molestia local durante los primeros 2 o 3 días, lo cual es señal de que la cascada de reparación celular se ha activado."
      }
    ]
  }
];

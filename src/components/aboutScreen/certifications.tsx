import React, { useEffect } from "react";
import { Certification as CertificationInterface } from "../../interface/Certification";
import supabase from "../../supabase/client";
import { useVariablesContext } from "../../context/variablesContext";
import { useTranslation } from "react-i18next";

const Certification: React.FC = () => {
  const [certification, setCertification] = React.useState<CertificationInterface[]>([]);
  const { phoneView, language } = useVariablesContext();
  const { t } = useTranslation();

  useEffect(() => {
    const getCertification = async () => {
      try {
        const { data: Certification, error } = await supabase
          .from("Certificates")
          .select("*")
          .order("date", { ascending: false });

        if (!error && Certification) {
          setCertification(Certification);
        }
      } catch (err) {
        // handle error if needed
      }
    };

    getCertification();
  }, []);

  return (
    <div className="w-full flex flex-col h-auto gap-5">
      <p className="text-text_primary dark:text-dark-text_primary text-bold flex flex-row items-center gap-2 font-bold font-clash text-xl-custom">
        <svg
          className="size-4 text-secondary fill-background dark:fill-dark-background"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
        </svg>
        {t("about.certifications.title")}
      </p>

      {certification.map((cer, index) => (
        <div key={index} className="h-auto w-full flex flex-row">
          {!phoneView ? (
            <div className="flex-[1]">
              <p className="text-text_primary dark:text-dark-text_primary">
                {cer.date}
              </p>
            </div>
          ) : null}
          <div className="flex flex-[2] flex-col gap-5">
            <div className="flex flex-row justify-between items-center h-10">
              <div className="font-bold text-text_primary dark:text-dark-text_primary h-10 flex flex-row items-center gap-2">
                {phoneView ? (
                  <img
                    src={cer.logo}
                    alt="logo"
                    className="h-full aspect-square rounded-[10px]"
                  />
                ) : null}
                {language === "es" ? cer.nameEN : cer.nameES}
              </div>
              {phoneView ? (
                <div className="font-bold text-text_primary dark:text-dark-text_primary">
                  {cer.date}
                </div>
              ) : (
                <img
                  src={cer.logo}
                  alt="logo"
                  className="h-full aspect-square rounded-[10px]"
                />
              )}
            </div>
            <div className="text-text_secondary dark:text-dark-text_secondary">
               {language === "es" ? cer.descriptionEN : cer.descriptionES}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certification;

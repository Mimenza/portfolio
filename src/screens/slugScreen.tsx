import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import Footer from "../components/shared/footer/footer";
import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";
import Menu from "../components/shared/menu/menu";
import PhoneMenu from "../components/shared/menu/phoneMenu";
import { useVariablesContext } from "../context/variablesContext";
import Gallery from "../components/shared/projectDetail/gallery";
import { FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const SlugScreen = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [allSlugs, setAllSlugs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { phoneView, language, setLoadingBarLoading } = useVariablesContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleRedirectBack = () => {
    setLoadingBarLoading(true);
    setTimeout(() => {
      setLoadingBarLoading(false);
      navigate(-1);
    }, 500);
  };

  const handleRedirect = (slug: string) => {
    setLoadingBarLoading(true);
    setTimeout(() => {
      setLoadingBarLoading(false);
      navigate(`${slug}`);
    }, 500);
  };
  // Modificado: fetch de todos los slugs y del proyecto actual
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all slugs
        const { data: slugsData, error: slugsError } = await supabase
          .from("Projects")
          .select("slug")
          .order("date", { ascending: false });

        if (slugsError) {
          //console.error("Error fetching slugs:", slugsError);
          setAllSlugs([]);
        } else if (Array.isArray(slugsData)) {
          const slugs = slugsData.map((item: any) => item.slug);
          setAllSlugs(slugs);
          setCurrentIndex(slugs.indexOf(slug || ""));
        }

        // Fetch project by slug (incluye html y htmlLink)
        type ProjectType = {
          id: number;
          name: string;
          slug: string;
          descriptionEN: string;
          descriptionES: string;
          date?: string;
          link?: string;
          statusEN?: string;
          statusES?: string;
          html?: string;
          htmlLinkEN?: string;
          htmlLinkES?: string;
          ["Projects-Tecnologies"]?: { Tecnologies?: { name: string } }[];
          ["Projects-Storage"]?: {
            Storage?: { link: string; cover?: boolean };
          }[];
        };

        const { data, error } = await supabase
          .from("Projects")
          .select(
            `
            *,
            Projects-Tecnologies (
              Tecnologies ( name )
            ),
            Projects-Storage (
              Storage ( link, cover )
            )
          `
          )
          .eq("slug", slug)
          .single<ProjectType>();

        if (error) {
          // console.error("Error fetching project:", error);
          setProject(null);
          setHtmlContent("<h1>Project not found</h1>");
          setLoading(false);
          navigate("/home");
          return;
        }

        if (data && typeof data === "object" && !Array.isArray(data)) {
          const formattedProject = {
            ...(typeof data === "object" && data !== null ? data : {}),
            technologies: Array.isArray(data["Projects-Tecnologies"])
              ? (data["Projects-Tecnologies"] as any[])
                .map((tech: any) => tech.Tecnologies?.name)
                .filter((name: string | undefined) => name !== undefined)
              : [],
            storage: Array.isArray(data["Projects-Storage"])
              ? (data["Projects-Storage"] as any[])
                .filter((store: any) => store.Storage)
                .map((store: any) => store.Storage.link)
              : [],
            cover: Array.isArray(data["Projects-Storage"])
              ? (data["Projects-Storage"] as any[])
                .filter((store: any) => store.Storage?.cover)
                .map((store: any) => store.Storage.link)[0] || null
              : null,
          };
          setProject(formattedProject);

          // Siempre actualiza el título aquí
          document.title = `Emimenza | ${data.slug}`;

          // Obtener el HTML
          // Cambia aquí para usar htmlLinkEN o htmlLinkES según language
          const htmlLink =
            language === "en" ? data.htmlLinkEN : data.htmlLinkES;

          if (
            htmlLink &&
            typeof htmlLink === "string" &&
            htmlLink.startsWith("http")
          ) {
            try {
              const response = await fetch(htmlLink);
              if (!response.ok) {
                throw new Error("Error fetching HTML file");
              }
              const html = await response.text();
              setHtmlContent(html);
            } catch (fetchError) {
              setHtmlContent("<h1>Error loading project content</h1>");
            }
          } else {
            setHtmlContent(data.html || "");
          }
        } else {
          setProject(null);
          setHtmlContent("<h1>Project not found</h1>");
        }
        setLoading(false);
      } catch (err) {
        //console.error("Error:", err);
        setProject(null);
        setHtmlContent("<h1>Error loading project content</h1>");
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, language]);

  // Calcula el slug anterior y siguiente
  const prevSlug =
    allSlugs.length > 0 && currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    allSlugs.length > 0 && currentIndex < allSlugs.length - 1
      ? allSlugs[currentIndex + 1]
      : null;

  // Prepara los items para la galería
  const galleryItems =
    project && project.storage
      ? project.storage.map((src: string) => {
        // Detecta si es video o imagen por la extensión
        const isVideo =
          typeof src === "string" &&
          (src.includes(".mp4") ||
            src.includes(".webm") ||
            src.includes(".ogg"));
        return {
          type: isVideo ? "video" : "image",
          src,
        };
      })
      : [];

  if (loading)
    return (
      <div className="bg-background dark:bg-dark-background min-h-screen w-full flex items-center justify-center text-text_primary dark:text-dark-text_primary">
        {language === "en" ? "Loading content..." : "Cargando contenido..."}
      </div>
    );

  return (
    <div className=" bg-background dark:bg-dark-background min-h-screen w-full px-4 md:px-12 py-10 flex flex-col gap-8 pt-20 md:pt-40">
      {/* Bloque oculto para forzar a Tailwind a incluir las clases usadas en el HTML externo */}
      <div className="hidden">
        <div className="w-full h-auto flex flex-col gap-4 text-text_secondary dark:text-dark-text_secondary pl-2 ml-2 flex items-start gap-x-2 text-lg shrink-0 block bg-gray-100 dark:bg-[#17181d] rounded p-2 mt-1 text-xs overflow-x-auto font-mono whitespace-pre font-bold relative absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded text-xs hover:bg-secondary/80 transition"></div>
      </div>
      {/* Gradientes */}
      <div className="fixed top-0 left-0 w-screen h-10 z-10 bg-gradient-to-b from-background dark:from-dark-background to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-screen h-10 z-10 bg-gradient-to-b from-transparent dark:to-dark-background to-background"></div>

      {phoneView ? (
        <PhoneMenu selectedSection={-1} />
      ) : (
        <Menu selectedSection={-1} />
      )}

      {project ? (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            <div className="flex-1">
              <button
                className="mb-6 text-md-custom text-text_secondary dark:text-dark-text_secondary hover:underline flex items-center gap-1"
                onClick={() => handleRedirectBack()}
              >
                &larr; {t("slug.go back")}
              </button>
              <h1 className="text-4xl-custom md:text-5xl-custom text-text_primary dark:text-dark-text_primary font-bold mb-3 font-clash">
                {project.name}
              </h1>
              <p className="text-base text-justify md:text-lg-custom md:text-left text-text_primary dark:text-dark-text_primary mb-6 max-w-3xl">
                {language === "en"
                  ? project.descriptionEN
                  : project.descriptionES}
              </p>
              {/* Tags/Technologies */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies?.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-background-muted dark:bg-dark-muted text-text_secondary dark:text-dark-text_secondary px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Right info */}
            <div className="flex flex-col items-end gap-4 min-w-[220px]">
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-background-muted dark:bg-dark-muted text-text_secondary dark:text-dark-text_secondary px-3 py-1 rounded text-xs">
                  {project.date || "----"}
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-text_primary dark:bg-dark-text_primary text-background dark:text-dark-background px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 shadow"
                >
                  {t("slug.code")} <FiExternalLink />
                </a>
              )}
              <div className="flex flex-col gap-1 text-sm w-full mt-2">
                <div className="flex flex-row justify-between items-center">
                  <span className="font-semibold text-text_primary dark:text-dark-text_primary w-16">
                    Status:
                  </span>
                  <span className="text-text_secondary dark:text-dark-text_secondary">
                    {language === "en" ? project.statusEN : project.statusES}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Gallery */}
          <div className="w-full bg-black rounded-xl overflow-hidden flex items-center justify-center">
            <div className="w-full aspect-w-16 aspect-h-9 relative group">
              {project.cover ||
                (project.storage && project.storage.length > 0) ? (
                <>
                  {/* Flecha izquierda */}
                  {galleryItems.length > 1 && (
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex((prev) =>
                          prev === 0 ? galleryItems.length - 1 : prev - 1
                        );
                      }}
                      style={{ fontSize: 32 }}
                      aria-label="Anterior"
                    >
                      ‹
                    </button>
                  )}
                  {/* Imagen/video principal */}
                  {(() => {
                    const idx = galleryIndex;
                    const item = galleryItems[idx];
                    if (!item) return null;
                    if (item.type === "video") {
                      return (
                        <div
                          className={`aspect-[16/9] overflow-hidden cursor-pointer ${phoneView ? "rounded-[12px]" : "rounded-[25px]"
                            }`}
                          onClick={() => setGalleryOpen(true)}
                        >
                          <video
                            src={item.src}
                            autoPlay
                            muted
                            loop
                            className={`h-full w-full object-cover transition-transform duration-300 ease-in-out ${phoneView ? "rounded-[12px]" : "rounded-[25px]"
                              }`}
                            onError={(e) => {
                              const videoElement = e.target as HTMLVideoElement;
                              videoElement.style.display = "none";
                              const imgElement =
                                videoElement.nextElementSibling as HTMLImageElement;
                              if (imgElement)
                                imgElement.style.display = "block";
                            }}
                          />
                          <img
                            src={item.src}
                            className={`h-full w-full object-cover transition-transform duration-300 ease-in-out hidden ${phoneView ? "rounded-[12px]" : "rounded-[25px]"
                              }`}
                            alt={project.name}
                          />
                        </div>
                      );
                    }
                    if (item.type === "image") {
                      return (
                        <img
                          src={item.src}
                          alt={project.name}
                          className="object-cover w-full h-full cursor-pointer"
                          onClick={() => setGalleryOpen(true)}
                        />
                      );
                    }
                    return null;
                  })()}
                  {/* Flecha derecha */}
                  {galleryItems.length > 1 && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex((prev) =>
                          prev === galleryItems.length - 1 ? 0 : prev + 1
                        );
                      }}
                      style={{ fontSize: 32 }}
                      aria-label="Siguiente"
                    >
                      ›
                    </button>
                  )}
                  {/* Indicador */}
                  {galleryItems.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white rounded px-3 py-1 text-xs opacity-0 group-hover:opacity-100">
                      {galleryIndex + 1} / {galleryItems.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-text_secondary dark:text-dark-text_secondary py-32 flex items-center justify-center w-full h-full">
                  No image available
                </div>
              )}
            </div>
          </div>
          {/* Gallery modal */}
          {galleryOpen && (
            <Gallery
              items={galleryItems}
              initialIndex={galleryIndex}
              onClose={() => setGalleryOpen(false)}
            />
          )}
          {/* HTML content */}
          {htmlContent && (
            <div className="flex flex-col gap-4 mt-8">
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          )}
          {/* Navigation */}
          <div className="flex justify-between w-full mt-8">
            <button
              className="flex items-center gap-2 bg-background-muted dark:bg-dark-muted text-text_secondary dark:text-dark-text_secondary transition border border-[#232329] rounded-lg px-6 py-3 shadow"
              disabled={!prevSlug}
              onClick={() => {
                if (prevSlug) handleRedirect(`/projects/${prevSlug}`);
              }}
            >
              &larr;{" "}
              <span className="hidden md:inline text-xs font-semibold">
                {t("slug.prev")}
              </span>
            </button>
            <button
              className="flex items-center gap-2 bg-background-muted dark:bg-dark-muted text-text_secondary dark:text-dark-text_secondary transition border border-[#232329] rounded-lg px-6 py-3 shadow"
              disabled={!nextSlug}
              onClick={() => {
                if (nextSlug) handleRedirect(`/projects/${nextSlug}`);
              }}
            >
              <span className="hidden md:inline text-xs font-semibold">
                {t("slug.next")}
              </span>
              &rarr;
            </button>
          </div>
        </>
      ) : (
        <div>No se encontró el proyecto.</div>
      )}
      <Footer />
    </div>
  );
};

export default SlugScreen;

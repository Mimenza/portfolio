import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

const SlugScreen = () => {
  const { slug } = useParams<{ slug: string }>();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logedUser } = useLogedUser();
  
  useEffect(() => {
      if (!logedUser) {
        navigate("/login");
      }
    }, []);

useEffect(() => {
  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("Projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      setHtmlContent("<h1>Proyect not found</h1>");
      navigate("/home");
    } else {

      // Verifica si data.html es un enlace
      if (data.htmlLink && data.htmlLink.startsWith("http")) {
        try {
          const response = await fetch(data.htmlLink);
          if (!response.ok) {
            throw new Error("Error fetching HTML file");
          }
          const html = await response.text();
          setHtmlContent(html);
        } catch (fetchError) {
          console.error("Error fetching HTML file:", fetchError);
          setHtmlContent("<h1>Error loading project content</h1>");
        }
      } else {
        setHtmlContent(data.html);
      }
    }

    setLoading(false);
  };

  fetchProject();
}, [slug]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
      className="project-html-content"
    />
  );
};

export default SlugScreen;

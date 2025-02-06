import { Helmet } from "react-helmet-async";

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;

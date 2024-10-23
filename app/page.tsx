"use client";

import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@api/admin/auth/get-token/page";
import CustomCard from "@atoms/custom-card";
import CustomRadio from "@atoms/custom-radio";
import FancyButton from "@atoms/fancy-button";
import Title from "@atoms/title";
import { setKeyApi } from "@utils/utilities";


const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("POS");
  const [checkoutType, setCheckoutType] = useState<string | null>(null);

  
  const fetchToken = async () => {
    const token = await GetToken()
    if (token) {
      setKeyApi(token);
    } else {
      console.error("Token is undefined");
    }

  };

  useEffect(() => {
    if (!checkoutType) {
      fetchToken();
    }
  }, [checkoutType]);

  const radioOptions = [
    { id: "pos", value: "POS" },
    { id: "sco", value: "SCO" },
  ];

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleButtonClick = () => {
    setCheckoutType(selectedOption);

    if (selectedOption === "POS") {
      router.push("/account/login");
    } else if (selectedOption === "SCO") {
      router.push("/selfcheckout/checkout");
    }
  };

  return (
    <Grid
      container
      className="min-h-screen"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(to right, black, #2c3e50, #0064dc)",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Grid size={{ xs: 12, md: 6 }} textAlign={{ xs: "center", md: "center" }} padding={{ md: "0 90px" }}>
        {selectedOption === "POS" && (
          <CustomCard
            beforeContent={<Title text={t("tle_point_sale")} size="h2" sx={{ color: "#fff" }} />}
            afterContent={
              <>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Grid size={{ xs: 12, md: 11 }} spacing={5}>
                    <Title text={t("tle_point_sale")} size="h3" sx={{ color: "#fff" }} />
                  </Grid>
                  <Image
                    src="/img/pointSale.png"
                    alt="Punto de Venta"
                    width={400}
                    height={400}
                    style={{ borderRadius: "20px" }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FancyButton label={t("lbl_login")} variant="primary" onClick={handleButtonClick} />
                </Grid>
              </>
            }
          />
        )}

        {selectedOption === "SCO" && (
          <CustomCard
            beforeContent={<Title text={t("tle_self_checkout")} size="h2" sx={{ color: "#fff" }} />}
            afterContent={
              <>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Title text={t("tle_self_checkout")} size="h3" sx={{ color: "#fff" }} />
                  </Grid>
                  <Image
                    src="/img/selfCheckout.png"
                    alt="SelfCheckout"
                    width={400}
                    height={400}
                    style={{ borderRadius: "20px" }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FancyButton label={t("lbl_welcome")} variant="primary" onClick={handleButtonClick} />
                </Grid>
              </>
            }
          />
        )}

        <Grid container justifyContent={{ xs: "center", md: "center" }} spacing={5} sx={{ marginTop: "80px" }}>
          <Grid size={{ xs: 12 }}>
            <CustomRadio options={radioOptions} name="pos-sco-radio" onChange={handleRadioChange} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
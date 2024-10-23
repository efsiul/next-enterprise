"use client";

import { Box } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { GetSubsidiarySystemAttributs } from "@api/admin/subsidiary/get-subsidiary-system-attributes/page";
import { StyleAtom } from "@atoms/states/style-atom"; // Tu atom de estilos globales
import { GetSubsidiarySysAttribResponseInterface } from "@interfaces/response-interfaces/admin/get-subsidiary-sys-attrib-response-interface";
import Navbar from "@molecules/navbar";
import { montserrat } from "@styles/fonts";

interface StyleGlobalProps {
    children: React.ReactNode;
}

const StyleGlobal: React.FC<StyleGlobalProps> = ({ children }) => {
    const [, setStyles] = useAtom(StyleAtom);
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga de los estilos

    const fetchStyles = useCallback(async () => {
        try {
            const response = (await GetSubsidiarySystemAttributs({
                id: "",
                idSubsidiary: 3,
                idCompany: "3",
                name: "",
                value: "",
                type: "Style",
                typeValue: "",
                idUser: "1",
                active: true,
                page: 0,
                size: 100,
            })) as GetSubsidiarySysAttribResponseInterface;

            if (response?.correct) {
                const stylesObj = response.object.list.reduce((acc: any, item: any) => {
                    acc[item.name] = item.value;
                    return acc;
                }, {});
                setStyles(stylesObj);
            }
        } catch (error) {
            console.error("Error fetching styles:", error);
        } finally {
            setLoading(false);
        }
    }, [setStyles]);

    useEffect(() => {
        fetchStyles();
    }, [fetchStyles]);

    if (loading) {
        return <div>Cargando estilos...</div>;
    }

    return (
        <Box
            className={`${montserrat.className} antialiased`}
            sx={{
                backgroundColor: "background.default",
                color: "text.primary",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Navbar />
            {children}
        </Box>
    );
};

export default StyleGlobal;

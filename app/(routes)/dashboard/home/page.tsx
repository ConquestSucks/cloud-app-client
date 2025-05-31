'use client'

import { FileUploadForm } from "@/app/entities/cloudFile/ui/FileUploadForm";
import PageTitle from "@/app/shared/ui/pageTitle";
import React from "react";

const Home = () => {
    return <div className="dashboard-page">
        <PageTitle title="Мой диск" />
        <FileUploadForm />
    </div>;
};

export default Home;

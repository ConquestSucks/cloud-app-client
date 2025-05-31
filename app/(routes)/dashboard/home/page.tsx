'use client'

import FileUploadForm from "@/app/entities/cloudFile/ui/file-upload/FileUploadForm";
import DisplayFileList from "@/app/entities/cloudFile/ui/get-files/DisplayFileList";
import PageTitle from "@/app/shared/ui/PageTitle";


import React from "react";

const Home = () => {
    return <div className="dashboard-page">
        <PageTitle title="Мой диск" />
        <FileUploadForm />
        <DisplayFileList />
    </div>;
};

export default Home;

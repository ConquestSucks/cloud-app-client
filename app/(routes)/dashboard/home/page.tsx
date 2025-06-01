'use client'

import FileUploadForm from "@/app/entities/cloudFile/ui/file-upload/FileUploadForm";
import DisplayFileList from "@/app/entities/cloudFile/ui/get-files/DisplayFileList";
import PageTitle from "@/app/shared/ui/PageTitle";

import React from "react";

const Home = () => {
    return (
        <div className="dashboard-page relative w-full">
            <div className="absolute top-5 right-5">
                <FileUploadForm />
            </div>
            <PageTitle title="Мой диск" />
            <div className="mt-8">
                <DisplayFileList />
            </div>
        </div>
    );
};

export default Home;

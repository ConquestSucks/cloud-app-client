'use client'

import FileUploadForm from "@/core/entities/cloudFile/ui/file-upload/FileUploadForm";
import DisplayFileList from "@/core/entities/cloudFile/ui/get-files/DisplayFileList";
import PageTitle from "@/app/shared/ui/PageTitle";

import React from "react";

const Home = () => {
    return (
        <div className="dashboard-page relative w-full">
            <div className="flex justify-between">
                <PageTitle title="Мой диск" />
                <FileUploadForm />
            </div>
            <div className="mt-8">
                <DisplayFileList />
            </div>
        </div>
    );
};

export default Home;

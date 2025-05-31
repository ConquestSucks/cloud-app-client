const DisplayStorageQuota = () => {
    const total = 100;
    const video = 40;
    const photo = 30;
    const other = 10;
    const used = video + photo + other;

    return (
        <div className="grow">
            <p className="text-sm mb-2 text-gray-300 ">Использовано: <span className="text-3xl text-white">{used} ГБ</span> из {total} ГБ</p>

            <div className="h-4 rounded-full overflow-hidden bg-gray-300 flex">
                <div
                    className="bg-blue-500"
                    style={{ width: `${(video / total) * 100}%` }}
                />
                <div
                    className="bg-green-500"
                    style={{ width: `${(photo / total) * 100}%` }}
                />
                <div
                    className="bg-orange-400"
                    style={{ width: `${(other / total) * 100}%` }}
                />
            </div>

            <div className="flex gap-4 mt-2 text-xs text-gray-300">
                <span>Видео: {video} ГБ</span>
                <span>Фото: {photo} ГБ</span>
                <span>Другое: {other} ГБ</span>
            </div>
        </div>
    );
};

export default DisplayStorageQuota;

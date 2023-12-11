async function FetchData(link, method, body, jwt, content) {

    if (!content) {
        content = "application/json";
    }

    const fetchData = {
        headers: {
            "Content-Type": content,
        },
        method: method,
    };

    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    }

    if (body) {
        fetchData.body = JSON.stringify(body);
    }

    return await fetch(link, fetchData)
        .then(async (res) => {
            const contentType = res.headers.get("content-type");

            return {
                status: res.status,
                content: contentType && contentType.indexOf(content) !== -1 ? await res.json() : await res.text()
            };
        });
}
export default FetchData;
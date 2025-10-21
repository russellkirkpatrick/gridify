import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Save = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {tracks, range, limit} = state

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [createdUrl, setCreatedUrl] = useState("");


  const uris = (tracks || [])
    .slice(0, limit)
    .map(t => t?.uri)
    .filter(Boolean);

  useEffect(() => {
    if (!tracks) {
      navigate(-1);
    }
  }, [tracks, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setCreatedUrl("");

    if (!name.trim()) {
      title = ""
      if (range === "short_term") {
        title += "songs of the month"
      }
      else if (range === "medium_term") {
        title += "songs of the last 6 months"
      }
      else if (range === "long_term") {
        title += "songs of the year"
      }
      else {
        title += "top songs"
      }
      setName(`Gridify - ${title}`);
    }

    try {
      setLoading(true);
      const res = await fetch("https://gridify-api.onrender.com/playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          public: isPublic,
          uris
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create playlist");
      setCreatedUrl(data?.playlist?.url || "");
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

    return (
    <div
      className="
        w-[90%] max-w-[360px] mx-auto 
        mt-12 sm:mt-20 mb-12
        flex flex-col items-center gap-3 sm:gap-4
        overflow-hidden
      "
    >
      {/* Tracks */}
      <div className="w-full rounded-lg bg-white/90 shadow-md p-2 sm:p-3">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Tracks</h3>
        <ul className="text-xs sm:text-sm text-gray-800 max-h-28 sm:max-h-40 overflow-y-auto leading-5">
          {(tracks || []).slice(0, limit).map((t, i) => (
            <li key={t?.id || i} className="truncate">
              {i + 1}. {t?.name}
              {t?.artists?.[0]?.name ? ` — ${t.artists[0].name}` : ""}
            </li>
          ))}
        </ul>
      </div>

      {/* Success */}
      {createdUrl && (
        <div className="w-full rounded-lg bg-white/90 p-2 sm:p-3 shadow-md flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <a
              href={createdUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#1DB954] text-white px-3 py-[5px] h-[32px] text-xs sm:text-sm rounded-md shadow-sm hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50 transition flex items-center gap-1"
            >
              ✅ Open on Spotify
            </a>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-3 py-[5px] h-[32px] text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      {!createdUrl && (
        <div className="w-full rounded-lg bg-white/90 p-2 sm:p-3 shadow-md">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Save playlist</h3>

          <form onSubmit={onSubmit} className="space-y-2 sm:space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[34px] rounded-md border border-gray-300 px-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
              placeholder="name *"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
              placeholder="Description (optional)"
            />

            <label className="inline-flex items-center gap-2 select-none text-xs sm:text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400"
              />
              Make playlist public
            </label>

            {err && <p className="text-xs sm:text-sm text-red-600">{err}</p>}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-2 py-[5px] h-[30px] text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1DB954] text-white px-3 py-[5px] h-[30px] text-xs sm:text-sm rounded-md shadow-sm hover:bg-[#1ed760] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50 transition"
              >
                {loading ? "Creating…" : "Create"}
              </button>
            </div>
          </form>

          <p className="mt-2 text-[11px] sm:text-xs text-gray-500">
            Adding {limit} tracks.
          </p>
        </div>
      )}
    </div>
  );



}


export default Save
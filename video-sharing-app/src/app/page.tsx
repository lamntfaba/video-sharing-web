'use client';
import Header from './components/header';
import { onValue, ref, update } from 'firebase/database';
import { database } from '@/utils/firebaseConfig';
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/AuthContext';
import YouTube from 'react-youtube';
import Loading from './components/Common/Loading';
import IconDislike from './components/Icons/IconDislike';
import IconLike from './components/Icons/IconLike';
import VideoType from '@/types/VideoType';
import IconLikeBlack from './components/Icons/IconLikeBlack';
import IconDislikeBlack from './components/Icons/IconDislikeBlack';

export default function Home() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const { user, loading } = useContext(Context);
  const opts = {
    height: '195',
    width: '320',
    playerVars: {
      autoplay: 0,
    }
  };
  useEffect(() => {
    const starCountRef = ref(database, 'videos/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const arr: VideoType[] = [];
      Object.keys(data).forEach((key) => {
        arr.push(data[key]);
      })
      setVideos(arr);
    });
  }, []);

  const handleVoteUp = (id: string, index: number) => {
    const likedList = videos[index].likedList ?? [];
    const findIndex = likedList.indexOf(user.uid);
    if (findIndex > -1) {
      likedList.splice(findIndex, 1);
    } else {
      likedList.push(user.uid);
    }
    videos[index].likedList = likedList;
    const dbRef = ref(database, `videos/${id}`)
    update(dbRef, { likedList }).then(() => {
      console.log("Data updated");
    }).catch((e) => {
      console.log(e);
    });
  };

  const handleVoteDown = (id: any, index: number) => {
    const dislikedList = videos[index].dislikedList ?? [];
    const findIndex = dislikedList.indexOf(user.uid);
    if (findIndex > -1) {
      dislikedList.splice(findIndex, 1);
    } else {
      dislikedList.push(user.uid);
    }
    videos[index].dislikedList = dislikedList;
    const dbRef = ref(database, `videos/${id}`)
    update(dbRef, { dislikedList }).then(() => {
      console.log("Data updated");
    }).catch((e) => {
      console.log(e);
    });
  }

  const renderAction = (video: VideoType, index: number) => {
    const likedList = video.likedList ?? [];
    const dislikedList = video.dislikedList ?? [];
    if (!user.uid) {
      return <span className='text-xs'>(Please log in to react to your feeling for this video)</span>;
    }
    if (likedList.indexOf(user.uid) > -1) {
      return <IconLikeBlack onClick={() => handleVoteUp(video.videoId, index)} className='float-left text-2xl hover:scale-110 inline-block cursor-pointer' />
    }
    if (dislikedList.indexOf(user.uid) > -1) {
      return <IconDislikeBlack onClick={() => handleVoteUp(video.videoId, index)} className='float-left text-2xl hover:scale-110 inline-block cursor-pointer' />
    }
    return <>
      <IconLike onClick={() => handleVoteUp(video.videoId, index)} className='float-left text-2xl hover:scale-110 inline-block cursor-pointer' />
      <IconDislike onClick={() => handleVoteDown(video.videoId, index)} className='float-left text-2xl hover:scale-110 inline-block cursor-pointer' />
    </>;
  }

  if (loading) {
    return <main className="flex min-h-screen flex-col items-center justify-between bg-white"><Loading /></main>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />
      <hr />
      <div className='w-full px-48 pt-20'>
        <ul role="list" className="divide-y divide-gray-100">
          {videos.map((video: any, index: number) => (
            <li key={video.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <YouTube videoId={video.videoId} opts={opts} />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-red-700">{video.title}</p>
                  <div className="flex items-center space-x-1">
                    <p className="mt-1 truncate text-xs leading-4 text-gray-500">Shared by: {video.createBy}</p>
                    {renderAction(video, index)}
                  </div>

                  <div className="flex items-center space-x-1 text-sm">
                    <div>{video.likedList ? video.likedList.length : 0}</div>
                    <IconLike className='float-left inline-block' />
                    <div>{video.dislikedList ? video.dislikedList.length : 0}</div>
                    <IconDislike className='float-left inline-block' />
                  </div>
                  <p className="mt-1 truncate text-xs leading-4 text-gray-500">Description</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

sql query :
```sql
SELECT
    c.id     AS channel_id,
    c.name   AS channel_name,
    count(s.id) AS subscribers
FROM
    channels c
    LEFT JOIN subscribers s ON s.channel_id = c.id
GROUP BY
    c.id,
    c.name
ORDER BY
    c.id;
```

output :
| channel_id | channel_name | subscribers |
| -------- | ------- | ------- |
| 1 | dokter mobil | 6 |
| 2 | oto driver | 4 |
| 3 | moto mobi | 5 |
| 4 | autonetmagz | 4 |
| 5 | close the door podcast | 4 |

sql query :
```sql
SELECT
    u.id     AS user_id,
    u.name   AS user_name,
    count(s.id) AS channel_subscribed
FROM
    users u
    LEFT JOIN subscribers s ON s.user_id = u.id
GROUP BY
    u.id,
    u.name
ORDER BY
    u.id;
```

output :
| user_id | user_name | channel_subscribed |
| -------- | ------- | ------- |
| 4 | ko lung lung | 5 |
| 5 | fitra eri | 2 |
| 6 | om mobi | 3 |
| 7 | ridwan hanif | 2 |
| 8 | deddy corbuzier | 2 |
| 9 | melissa | 1 |
| 10 | dwi heryanto | 4 |
| 11 | guntur | 0 |
| 12 | tria | 0 |
| 13 | stenri | 0 |

sql query :
```sql
with video_likes AS (
    select
        videos.id,
        count(likes.id) likes
    from
        videos
        left join likes on likes.video_id = videos.id
    group by
        videos.id
), video_comments AS (
    select
        videos.id,
        count(comments.id) comments
    from
        videos
        left join comments on comments.video_id = videos.id
    group by
        videos.id
)
select 
    videos.id,
    videos.title,
    video_likes.likes,
    video_comments.comments
from
    videos
    join video_likes on video_likes.id = videos.id
    join video_comments on video_comments.id = videos.id;
```

output :
| id | title | likes | comments |
| -------- | ------- | ------- | ------- |
| 1 | sembarangan beli additif cat calterpan rontok | 4 | 3 |
| 2 | penyakit chevrolet captiva diesel | 3 | 1 |
| 3 | masalah mobil diesel paling sering terjadi | 1 | 0 |
| 4 | grebek gudang spare parts hyundai | 2 | 3 |
| 5 | d-cab raksasa kita turunkan ke jalan | 2 | 3 |
| 6 | ini dia suv terkencang porche saat ini | 2 | 4 |
| 7 | tes off road bus 4x4 | 2 | 3 |
| 8 | wuling cortez turbo setelah 4 tahun | 6 | 2 |
| 9 | wuling air ev hitam vs putih punya fitra eri | 2 | 6 |
| 10 | bengkel terbesar di asia tenggara ada di indonesia | 2 | 2 |
| 11 | main ke pameran alat tambang di jakarta | 2 | 3 |
| 12 | nyobain mudik naik volvo xc40 recharge phev | 2 | 5 |
| 13 | meja gue hancur di pukul | 5 | 3 |
| 14 | kelakuan onad di rumah dibongkar istri | 0 | 1 |
| 15 | kisah wanita bermata 7 | 8 | 5 |

sql query :
```sql
with subscribers_cnt as (
    select
        c.id,
        count(s.id) as subscribers
    from
        channels c
        left join subscribers s on s.channel_id = c.id
    group by
        c.id
), videos_cnt AS (
    select
        c.id,
        count(v.id) as videos
    from
        channels c
        left join videos v on v.channel_id = c.id
    group by
        c.id
), likes_cnt AS (
    select
        c.id,
        count(l.id) as likes
    from
        channels c
        left join videos v on v.channel_id = c.id
        left join likes l on l.video_id = v.id
    group by
        c.id
), comments_cnt AS (
    select
        c.id,
        count(c2.id) as comments
    from
        channels c
        left join videos v on v.channel_id = c.id
        left join comments c2 on c2.video_id = v.id
    group by
        c.id
)
select
    c.id,
    c.name,
    u.name as owner,
    sc.subscribers,
    vc.videos,
    lc.likes,
    cc.comments
from
    channels c
    inner join users u on u.id = c.user_id
    inner join subscribers_cnt sc on sc.id = c.id
    inner join videos_cnt vc on vc.id = c.id
    inner join likes_cnt lc on lc.id = c.id
    inner join comments_cnt cc on cc.id = c.id
order by
    c.id
```
output :
| id | name | owner | subscribers | videos | likes | comments |
| -------- | ------- | ------- | ------- | ------- | ------- | ------- |
| 1 | dokter mobil | ko lung lung | 6 | 3 | 8 | 4 |
| 2 | oto driver | fitra eri | 4 | 3 | 6 | 10 |
| 3 | moto mobi | om mobi | 5 | 3 | 10 | 11 |
| 4 | autonetmagz | ridwan hanif | 4 | 3 | 6 | 10 |
| 5 | close the door podcast | deddy corbuzier | 4 | 3 | 13 | 9 |
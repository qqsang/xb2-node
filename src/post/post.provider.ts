/**
 * sql查询片段
 */
export const sqlFragment = {
  user: `
  JSON_OBJECT(
    'id',user.id,
    'name',user.name,
    'avatar',IF(COUNT(avatar.id),1,null)
  ) as user
  `,
  leftjoinuser: `
  LEFT JOIN user
  ON user.id = post.userId
  LEFT JOIN avatar
  ON user.id = avatar.userId
  `,
  totalcomments: `
  (
		SELECT
      COUNT(comment.id)
		FROM
			comment 
		WHERE
			comment.postId = post.id
  ) as totalcomments
  `,
  leftjoinonefile: `
    LEFT JOIN LATERAL(
      SELECT *
      FROM file 
      WHERE file.postId = post.id
      ORDER BY file.id DESC
      LIMIT 1
    ) AS file ON file.postId = post.id
  `,
  file: `
  CAST (
      IF (
        COUNT(file.id),
        GROUP_CONCAT(
          DISTINCT JSON_OBJECT(
            'id',file.id,
            'width',file.width,
            'height',file.height
          )
        ),
        NULL
      )AS JSON
    )AS file 
  `,
  leftjointag: `
    LEFT JOIN post_tag
    ON post_tag.postId = post.id
    LEFT JOIN tag
    ON tag.id = post_tag.tagId
  `,
  tags: `
            CAST(
              IF(
                COUNT(tag.id),
                CONCAT(
                  '[',
                  GROUP_CONCAT(
                    DISTINCT JSON_OBJECT(
                      'id',tag.id,
                      'name',tag.name
                    )
                  ),
                  ']'
                ),
                NULL
              ) AS JSON
            ) AS tags
  `,
  totallikes: `
  (
    SELECT COUNT(user_like_post.postId)
    FROM user_like_post
    WHERE user_like_post.postId = post.id
  ) AS totallikes
  `,
  innerjoinuserlikepost: `
    INNER JOIN user_like_post
      ON user_like_post.postId = post.id
  `,
};

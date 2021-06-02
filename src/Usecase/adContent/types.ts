export type UploadTwitterType = {
    url: string,
    description: string
    time_start: number
    time_expire: number
    category: string
    username: string
    id_iklan: string
    views: number
}

export type GetTwitterType = {
    embed_code: string,
    description: string
    category: string
    id_iklan: string
}

export type UploadTwitterParam = {
    url: string
    description: string
    expire: number
}

export type GetTwitterParam = {
    API_KEY: string
    width: number
    total_res: number
}
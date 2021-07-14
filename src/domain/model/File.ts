export class File {
  id?: string
  path?: string
  extension: string
  name: string
  url: string
  constructor({ id, path, extension, name, url }: {
    id?: string, path?: string, extension: string, name: string, url?: string
  }) {
    this.id = id
    this.path = path
    this.extension = extension
    this.name = name
    this.url = url
  }
}
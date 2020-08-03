export default class galleryPage {


    get title(){
        return cy.get('#title')
    }

    get description(){
        return cy.get('#description')
    }

    get image(){
        return cy.get('[type=url]')
    }

    get submit(){
        return cy.get('[type=submit]').contains('Submit')
    }

    createGallery(naziv, opis, slika){
        this.title.type(naziv)
        this.description.type(opis)
        this.image.type(slika)
        this.submit.click()
    }


}

export const GalleryPage = new galleryPage()
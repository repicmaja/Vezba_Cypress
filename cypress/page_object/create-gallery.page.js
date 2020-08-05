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
    get picture(){
        return cy.get('.box-title')
}
    get submit(){
        return cy.get('[type=submit]').contains('Submit')
    }
    get edit(){
        return cy.get('.btn').contains('Edit Gallery')
    
}
get desnaStrelica(){
    return cy.get('.carousel-control-next-icon')

}
get slika(){
    return cy.get('.d-block')
}
    get up(){
        return cy.get('.fa-chevron-circle-up')
 }
get addImage(){
    return cy.get('[type=button]').contains('Add image')
}
    createGallery(naziv, opis, slika){
        this.title.type(naziv)
        this.description.type(opis)
        this.image.type(slika)
        this.submit.click()
    }


}

export const GalleryPage = new galleryPage()
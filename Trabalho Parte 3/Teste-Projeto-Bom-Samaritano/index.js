const {Builder, By, Key} = require("selenium-webdriver")

const url = "https://fabriciocruzz.github.io/Projeto-Bom-Samaritano/"

async function testePaginaDeCadastro(){
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.manage().window().maximize()
    let xpath

    await driver.get(url)
    
    
    // Encaminha da Home para Cadastro
    xpath = "/html/body/nav/ul/li[4]/a"
    await driver.findElement(By.xpath(xpath)).sendKeys(Key.ENTER)

    //Preenchendo dados do formulário de cadastro:
    await driver.findElement(By.id("nomeCompleto")).sendKeys("Nome de Exemplo do Teste", Key.NULL)
    await driver.findElement(By.id("dataNasc")).sendKeys("11032021", Key.NULL)
    
    //Acessando input do tipo "radio" e selecionando uma das opções
    xpath = "/html/body/form/fieldset[1]/div[3]/label[2]/input"
    await driver.findElement(By.xpath(xpath)).click()

    await driver.findElement(By.id("telefone1")).sendKeys("35123456789", Key.NULL)
    await driver.findElement(By.id("telefone2")).sendKeys("35987654321", Key.NULL)

    await driver.findElement(By.id("rua")).sendKeys("Rua João XXIII", Key.NULL)
    await driver.findElement(By.id("bairro")).sendKeys("Centro", Key.NULL)
    await driver.findElement(By.id("numero")).sendKeys("123", Key.NULL)
    await driver.findElement(By.id("complemento")).sendKeys("Perto do Posto de Gasolina", Key.NULL)
    
    xpath = "/html/body/form/fieldset[3]/div[1]/label[3]/input"
    await driver.findElement(By.xpath(xpath)).click()

    xpath = "/html/body/form/fieldset[3]/div[2]/label[4]/input"
    await driver.findElement(By.xpath(xpath)).click()

    xpath = "/html/body/form/fieldset[3]/div[3]/label[4]/input"
    await driver.findElement(By.xpath(xpath)).click()

    await driver.findElement(By.id("qtdTrabalhadores")).sendKeys("2", Key.ENTER)

    await driver.findElement(By.id("rendaMedia")).sendKeys("1500", Key.ENTER)

    xpath = "/html/body/form/fieldset[3]/div[6]/label[2]/input"
    await driver.findElement(By.xpath(xpath)).click()

    let obs = "Esta é uma mensagem de teste automatizada, gerada pelo Selenium Web Driver!"
    await driver.findElement(By.id("observacao")).sendKeys(obs, Key.NULL)

    await driver.findElement(By.id("button")).click()

    try {
        const cdpConnection = await driver.createCDPConnection('page')
        await driver.onLogEvent(cdpConnection, function (event) {
            console.log(event['args'][0]['value'])
        })
        await driver.executeScript('console.log()')
        await console.log("\nDADOS DO FORMULÁRIO PREENCHIDOS E ENVIADOS COM SUCESSO!\n")
        
        // Fechando o navegador:
        // await driver.quit()
      }catch (e){
        console.log(e)
      }
}

testePaginaDeCadastro()